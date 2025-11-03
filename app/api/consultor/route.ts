import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Cria um novo consultor
export async function POST(request: NextRequest) {
  try {
    const { nome, email, telefone, cpf, idade, endereco } =
      await request.json();

    if (!nome || !email || !cpf) {
      return NextResponse.json(
        { message: "Nome, email e CPF são obrigatórios" },
        { status: 400 }
      );
    }

    // Cria a pessoa e depois o consultor relacionado
    const consultor = await prisma.consultor.create({
      data: {
        pessoa: {
          create: {
            nome,
            email,
            telefone,
            cpf,
            idade,
            endereco: endereco ? { create: endereco } : undefined,
          },
        },
      },
      include: {
        pessoa: {
          include: {
            endereco: true,
          },
        },
      },
    });

    return NextResponse.json(consultor, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar consultor:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "E-mail ou CPF já cadastrado" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Erro ao criar consultor" },
      { status: 500 }
    );
  }
}

// GET consultor pelo id (via query ?id=)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    throw new Error("Id do consultor é obrigatorio");
  }

  // Se existir consulta por id do consultor
  try {
    const consultor = await prisma.consultor.findUnique({
      where: { id },
      include: {
        pessoa: {
          include: {
            endereco: true,
          },
        },
        clientes: true,
      },
    });

    if (!consultor) {
      return NextResponse.json(
        { message: "Consultor não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(consultor);
  } catch (error) {
    console.error("Erro ao buscar consultor:", error);
    return NextResponse.json(
      { message: "Erro ao buscar consultor" },
      { status: 500 }
    );
  }
}
