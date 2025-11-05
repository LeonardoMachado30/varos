import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { consultorSchema } from "@/utils/zod/schemas/consultor.schema";
import { ZodError } from "zod";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = consultorSchema.parse(body);

    const {
      pessoa: { tipoUsuario, nome, email, telefone, cpf, idade, endereco },
      clientesId,
    } = validatedData;

    let pessoaId = validatedData.pessoa.id;

    if (!validatedData.pessoa.id) {
      const pessoa = await prisma.pessoa.findFirst({
        where: { cpf },
      });

      pessoaId = pessoa?.id;
    }

    const enderecoNew = endereco
      ? { ...endereco, rua: endereco.endereco ?? null }
      : null;
    if (enderecoNew) delete enderecoNew.endereco;

    const pessoa = await prisma.pessoa.upsert({
      where: { id: pessoaId },
      update: {
        nome,
        email,
        telefone,
        idade,
        tipoUsuario,
        endereco: enderecoNew
          ? {
              upsert: {
                create: { ...enderecoNew },
                update: { ...enderecoNew },
              },
            }
          : undefined,
      },
      create: {
        tipoUsuario,
        nome,
        email,
        telefone,
        cpf,
        idade,
        endereco: enderecoNew ? { create: enderecoNew } : undefined,
      },
      include: { endereco: true },
    });

    let registro;

    if (tipoUsuario === "CLIENTE") {
      registro = await prisma.cliente.upsert({
        where: { pessoaId: pessoa.id },
        update: {
          pessoa: { connect: { id: pessoa.id } },
        },
        create: {
          pessoa: { connect: { id: pessoa.id } },
        },
        include: { pessoa: { include: { endereco: true } } },
      });
      await revalidatePath("/consultor/dashboard/cliente");
    }

    if (tipoUsuario === "CONSULTOR") {
      registro = await prisma.consultor.upsert({
        where: { pessoaId: pessoa.id },
        update: {
          clientes:
            clientesId && clientesId.length
              ? { set: clientesId.map((id: string) => ({ id })) }
              : undefined,
        },
        create: {
          pessoa: { connect: { id: pessoa.id } },
          clientes:
            clientesId && clientesId.length
              ? { connect: clientesId.map((id: string) => ({ id })) }
              : undefined,
        },
        include: {
          pessoa: { include: { endereco: true } },
          clientes: true,
        },
      });
      await revalidatePath("/consultor/dashboard/consultor");
    }

    await revalidatePath("/consultor/dashboard/cliente");

    return NextResponse.json(registro, { status: 201 });
  } catch (error: any) {
    console.error("Erro no POST /api/clientes:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: error.message ?? "Ops, algo deu errado. Tente novamente.",
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Registro já existente" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
