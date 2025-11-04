"use server";

import prisma from "@/lib/prisma";

export async function getClientes() {
  try {
    const data = await prisma.cliente.findMany({
      include: {
        pessoa: {
          include: {
            endereco: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Formata os dados conforme o Table espera
    const clientes = data.map((c) => ({
      id: c.id,
      nome: c.pessoa?.nome ?? "-",
      email: c.pessoa?.email ?? "-",
      status: "Ativo",
      telefone: c.pessoa.telefone ?? "-",
      idade: c.pessoa.idade ?? "-",
      cpf: c.pessoa.cpf ?? "-",
      endereco: c.pessoa.endereco
        ? `${c.pessoa.endereco.cidade} - ${
            c.pessoa.endereco.bairro ?? c.pessoa.endereco.estado
          }`
        : "-",
      createdAt: c.pessoa.createdAt ?? "-",
      updatedAt: c.pessoa.updatedAt ?? "-",
    }));

    return clientes;
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return [];
  }
}
