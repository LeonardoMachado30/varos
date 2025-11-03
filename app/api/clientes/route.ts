import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { tipoCliente, nome, email, telefone, cpf, idade, endereco } =
      await request.json();

    if (!nome || !email || !tipoCliente) {
      return NextResponse.json(
        { message: "Nome, email e tipo de cliente são obrigatórios" },
        { status: 400 }
      );
    }

    const cliente = await prisma.cliente.create({
      data: {
        tipoCliente,
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
    });

    return NextResponse.json(cliente, { status: 201 });
  } catch (error: any) {
    console.log("Erro ao criar cliente:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Email já cadastrado" },
        { status: 409 }
      );
    }

    return NextResponse.json({ message: error }, { status: 500 });
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
