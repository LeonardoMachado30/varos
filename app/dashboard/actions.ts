"use server";

import prisma from "@/lib/prisma";

export interface Search {
  nome?: string;
  email?: string;
  periodo?: string;
}

export async function getClientes({
  search = {},
  page = 1,
}: {
  search?: Search;
  page?: number;
}) {
  const perPage = 5;
  const take = perPage;
  const skip = (page - 1) * take;

  try {
    const where: any = {};

    if (search?.nome) {
      where.pessoa = {
        ...where.pessoa,
        nome: { contains: search.nome, mode: "insensitive" },
      };
    }

    if (search?.email) {
      where.pessoa = {
        ...where.pessoa,
        email: { contains: search.email, mode: "insensitive" },
      };
    }

    // Conta total de registros para paginação
    const totalRegistros = await prisma.cliente.count({
      where,
    });

    // Calcula o total de páginas com base no total de registros e itens por página
    const totalPaginas = Math.ceil(totalRegistros / perPage);

    const data = await prisma.cliente.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      include: {
        pessoa: {
          include: {
            endereco: true,
          },
        },
      },
    });

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

    return {
      data: clientes,
      page,
      perPage,
      totalRegistros,
      totalPaginas,
    };
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return {
      data: [],
      page,
      perPage,
      totalRegistros: 0,
      totalPaginas: 0,
    };
  }
}
