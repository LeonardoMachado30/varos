import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export async function POST(request: Request) {
  try {
    const { email, cpf } = await request.json();

    if (!email || !cpf) {
      return NextResponse.json(
        { message: "E-mail e CPF são obrigatórios" },
        { status: 400 }
      );
    }

    const consultor = await prisma.pessoa.findFirst({ where: { email, cpf } });
    if (!consultor) {
      return NextResponse.json(
        { message: "Consultor não encontrado" },
        { status: 404 }
      );
    }

    const token = jwt.sign(
      {
        consultorId: consultor.id,
        email: consultor.email,
        tipoUsuario: consultor.tipoUsuario,
      },
      SECRET,
      { expiresIn: "2d" }
    );

    // cria resposta
    const response = NextResponse.json({
      status: 200,
      token,
      message: "Login realizado com sucesso",
    });

    // define cookie httpOnly
    response.cookies.set("access-token", token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 2, // 2 dias
    });

    return response;
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
