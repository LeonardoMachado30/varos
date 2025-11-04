import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { email, cpf } = body;

    if (!email || !cpf) {
      return NextResponse.json(
        { message: "E-mail e CPF são obrigatórios" },
        { status: 400 }
      );
    }
    const consultor = await prisma.pessoa.findFirst({
      where: {
        email,
        cpf,
      },
    });
    if (!consultor) {
      return NextResponse.json(
        { message: "Consultor não encontrado" },
        { status: 404 }
      );
    }

    const token = jwt.sign(
      {
        consultorId: consultor.id,
        pessoaId: consultor.id,
        email: consultor.email,
        tipoUsuario: consultor.tipoUsuario,
      },
      SECRET,
      { expiresIn: "2d" }
    );

    const cookie = await cookies();

    cookie.set("access-token", token, {
      path: "/",
      domain: "localhost",
      maxAge: 3600,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // Or "strict" depending on your needs
    });
    return NextResponse.json({
      status: 200,
      token,
      message: "Login realizado com sucesso",
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Erro ao criar ou autenticar consultor" },
      { status: error.code }
    );
  }
}
