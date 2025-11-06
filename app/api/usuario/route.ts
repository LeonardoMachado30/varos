import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ZodError } from "zod";
import { revalidatePath } from "next/cache";
import { pessoaSchema } from "@/utils/zod/schemas/pessoa.schema";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "ID obrigatório para consulta" },
        { status: 400 }
      );
    }

    // Busca a pessoa, incluindo as relações possíveis
    const pessoa = await prisma.pessoa.findUnique({
      where: { id },
      include: {
        endereco: true,
        cliente: {
          include: {
            consultor: {
              include: {
                pessoa: true,
              },
            },
          },
        },
        consultor: {
          include: {
            clientes: {
              include: {
                pessoa: true,
              },
            },
          },
        },
      },
    });

    if (!pessoa) {
      return NextResponse.json(
        { message: "Pessoa não encontrada" },
        { status: 404 }
      );
    }

    // Retorna pessoa e suas relações associadas (cliente, consultor)
    return NextResponse.json(pessoa);
  } catch (error: any) {
    console.error("Erro ao consultar pessoa:", error);
    return NextResponse.json(
      { message: "Erro ao consultar pessoa" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 🔹 Se for um array, vamos tratar como inserção em massa
    const isArray = Array.isArray(body);
    const pessoas = isArray ? body : [body];

    const resultados = [];

    for (const item of pessoas) {
      const validatedData = pessoaSchema.parse(item);
      const { id, cpf, tipoUsuario, clientesId, endereco, ...pessoaData } =
        validatedData;

      const uniqueKey = id ? { id } : cpf ? { cpf } : null;
      if (!uniqueKey) {
        throw new Error("É necessário informar id ou cpf");
      }

      const enderecoData = endereco
        ? {
            ...endereco,
            rua: endereco.endereco ?? endereco.rua ?? null,
          }
        : null;

      // 🔹 Executa o upsert de cada item individualmente
      const resultado = await prisma.$transaction(async (tx) => {
        const pessoa = await tx.pessoa.upsert({
          where: uniqueKey,
          update: {
            ...pessoaData,
            tipoUsuario,
            idade: pessoaData.idade ? Number(pessoaData.idade) : null,
            endereco: enderecoData
              ? {
                  upsert: {
                    create: enderecoData,
                    update: enderecoData,
                  },
                }
              : undefined,
          },
          create: {
            ...pessoaData,
            cpf: cpf ?? null,
            tipoUsuario,
            idade: pessoaData.idade ? Number(pessoaData.idade) : null,
            endereco: enderecoData ? { create: enderecoData } : undefined,
          },
        });

        if (tipoUsuario === "CLIENTE") {
          return await tx.cliente.upsert({
            where: { pessoaId: pessoa.id },
            update: {},
            create: { pessoaId: pessoa.id },
            include: {
              pessoa: { include: { endereco: true } },
              consultor: { include: { pessoa: true } },
            },
          });
        }

        if (tipoUsuario === "CONSULTOR") {
          return await tx.consultor.upsert({
            where: { pessoaId: pessoa.id },
            update: {
              clientes: clientesId?.length
                ? {
                    set: clientesId.map((id: string) => ({ id })),
                  }
                : undefined,
            },
            create: {
              pessoaId: pessoa.id,
              clientes: clientesId?.length
                ? {
                    connect: clientesId.map((id: string) => ({ id })),
                  }
                : undefined,
            },
            include: {
              pessoa: { include: { endereco: true } },
              clientes: { include: { pessoa: true } },
            },
          });
        }

        throw new Error("Tipo de usuário inválido");
      });

      resultados.push(resultado);
    }

    // 🔹 Revalida cache após o loop
    revalidatePath("/consultor/dashboard/cliente");
    revalidatePath("/consultor/dashboard/consultor");

    return NextResponse.json(isArray ? resultados : resultados[0], {
      status: 201,
    });
  } catch (error: any) {
    console.error("Erro no POST /api/usuario:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Erro de validação", errors: error.issues },
        { status: 400 }
      );
    }

    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "CPF já cadastrado" },
        { status: 409 }
      );
    }

    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "Registro não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: error.message || "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
