import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Id do consultor é obrigatório" },
      { status: 400 }
    );
  }

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

    // if (consultor.pessoa && "password" in consultor.pessoa) {
    //   delete consultor.pessoa.password;
    // }

    return NextResponse.json(consultor, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar consultor:", error);
    return NextResponse.json(
      { message: "Erro ao buscar consultor" },
      { status: 500 }
    );
  }
}
