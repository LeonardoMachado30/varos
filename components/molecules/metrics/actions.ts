"use server";

import prisma from "@/lib/prisma";

export async function getClienteMetricas7Dias() {
  const agora = new Date();
  const seteDiasAtras = new Date();
  seteDiasAtras.setDate(agora.getDate() - 7);

  const totalClientes7Dias = await prisma.cliente.count({
    where: {
      pessoa: {
        createdAt: {
          gte: seteDiasAtras,
          lte: agora,
        },
      },
    },
  });

  return totalClientes7Dias;
}
