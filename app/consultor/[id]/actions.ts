// src/app/consultor/dashboard/cliente/[id]/actions.ts
"use server";

import prisma from "@/lib/prisma";

export async function getConsultorById(id: string) {
  if (!id) return null;

  const cliente = await prisma.consultor.findUnique({
    where: { id },
    include: {
      pessoa: {
        include: {
          endereco: true,
        },
      },
      clientes: {
        include: {
          pessoa: true,
        },
      },
    },
  });

  return cliente;
}
