"use client";

// src/app/consultor/dashboard/cliente/[id]/page.tsx
import { getClienteById } from "./actions";
import ButtonGroup from "@/components/organims/group/ButtonGroup";

interface ClientePageProps {
  params: {
    id: string;
  };
}

export default async function ClientePage({ params }: ClientePageProps) {
  const clienteParams = await params;
  const cliente = await getClienteById(clienteParams.id);

  if (!cliente) {
    return null;
  }

  const { pessoa } = cliente;

  return (
    <>
      <ButtonGroup url={`/usuario/cliente/${cliente.pessoa.id}`} />

      <div className="max-w-xl mx-auto py-10 px-4">
        <h1 className="text-3xl mb-4">Detalhes do Cliente</h1>

        <div className="bg-[#131516] text-[#B0B7BE] border-[#222729] border p-6 rounded-lg shadow flex gap-3 flex-col">
          <p>
            <span className="font-semibold">Nome:</span> {pessoa.nome}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {pessoa.email || "-"}
          </p>
          <p>
            <span className="font-semibold">Telefone:</span>{" "}
            {pessoa.telefone || "-"}
          </p>
          <p>
            <span className="font-semibold">CPF:</span> {pessoa.cpf || "-"}
          </p>
          <p>
            <span className="font-semibold">Idade:</span> {pessoa.idade ?? "-"}
          </p>
          <p>
            <span className="font-semibold">Endereço:</span>{" "}
            {pessoa.endereco
              ? `${pessoa.endereco.rua ?? ""}, ${
                  pessoa.endereco.numero ?? ""
                }, ${pessoa.endereco.cidade ?? ""} - ${
                  pessoa.endereco.estado ?? ""
                }`
              : "-"}
          </p>
        </div>
      </div>
    </>
  );
}
