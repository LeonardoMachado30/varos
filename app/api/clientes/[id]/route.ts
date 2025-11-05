import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;

    const cliente = await prisma.cliente.findUnique({
      where: { id },
      include: {
        pessoa: {
          include: {
            endereco: true,
          },
        },
        consultor: {
          include: {
            pessoa: true,
          },
        },
      },
    });

    return NextResponse.json(cliente);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
