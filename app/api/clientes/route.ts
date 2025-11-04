import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { consultorSchema } from "@/utils/zod/schemas/consultor.schema";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = consultorSchema.parse(body);

    const {
      pessoa: { tipoUsuario, nome, email, telefone, cpf, idade, endereco },
    } = validatedData;

    if (await prisma.pessoa.findFirst({ where: { cpf } })) {
      // Agora lança um erro do Zod caso o CPF já exista
      throw new ZodError([
        {
          code: "custom",
          message: "CPF já cadastrado",
          path: ["pessoa.cpf"],
        },
      ]);
    }

    const enderecoNew = endereco
      ? {
          ...endereco,
          rua: endereco.endereco ?? null,
        }
      : null;

    if (enderecoNew) {
      delete enderecoNew.endereco;
    }

    const cliente = await prisma.cliente.create({
      data: {
        pessoa: {
          create: {
            tipoUsuario,
            nome,
            email,
            telefone,
            cpf,
            idade,
            endereco: enderecoNew ? { create: enderecoNew } : undefined,
          },
        },
      },
    });

    return NextResponse.json(cliente, { status: 201 });
  } catch (error: any) {
    console.log("Erro ao criar cliente:", error);
    const errors = JSON.parse(error.message);

    console.log(errors[0].message);
    // Tratamento específico para erros do Zod
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: errors[0].message ?? "Ops, algo deu errado, tente novamente",
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    // Erro de unicidade do Prisma
    if (error.code === "P2002") {
      return NextResponse.json({ message: error }, { status: 409 });
    }

    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const clientes = await prisma.cliente.findMany({
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(clientes);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
