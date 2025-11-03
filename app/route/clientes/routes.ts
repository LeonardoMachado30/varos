import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { nome, email, telefone, cpf, idade, endereco } =
      await request.json();

    if (!nome || !email) {
      return NextResponse.json(
        { message: "Nome e email são obrigatórios" },
        { status: 400 }
      );
    }

    const cliente = await prisma.cliente.create({
      data: {
        pessoa: {
          create: {
            nome,
            email,
            telefone,
            cpf,
            idade,
            endereco,
          },
        },
      },
    });

    return NextResponse.json(cliente, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar cliente:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Email já cadastrado" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
