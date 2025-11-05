"use client";

// src/app/consultor/dashboard/cliente/[id]/page.tsx
import { useEffect, useState, useTransition } from "react";
import { getClienteById } from "./actions";
import HeaderButtonGroup from "@/components/organims/group/HeaderButtonGroup";
import { useParams, useRouter } from "next/navigation";
import LoadingClienteSkeleton from "./loading";

interface Cliente {
  id: string;
  createdAt: string;
  updatedAt: string;
  pessoa: {
    id?: string;
    nome: string;
    email?: string;
    telefone?: string;
    cpf?: string;
    idade?: number;
    endereco?: {
      rua?: string;
      numero?: string;
      cidade?: string;
      estado?: string;
    };
  };
}

export default function ClientePage() {
  const params = useParams();
  const id = params?.id as string;

  const router = useRouter();

  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    startTransition(async () => {
      try {
        const data = await getClienteById(id);
        setCliente(data as any);
      } catch {
        setError("Erro ao carregar dados do cliente.");
      }
    });
  }, [id]);

  if (isPending && !cliente) {
    return <LoadingClienteSkeleton />;
  }

  if (error || !cliente) {
    return (
      <div className="max-w-xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-4 text-red-400">Erro</h1>
        <p>{error || "Cliente não encontrado."}</p>
      </div>
    );
  }

  const { pessoa } = cliente;

  return (
    <>
      <HeaderButtonGroup
        type="cliente"
        buttons={[
          {
            label: "Editar cliente",
            type: "button",
            color: "primary",
            size: "lg",
            onClick: () => router.push("/usuario/cliente/" + cliente.pessoa.id),
          },
          {
            label: "Remover cliente",
            type: "button",
            color: "secondary",
            size: "lg",
            onClick: () => alert("Editar ainda não implementado"),
          },
        ]}
      />

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
          <p>
            <span className="font-semibold">Criado em:</span>{" "}
            {new Date(cliente.createdAt).toLocaleString("pt-BR")}
          </p>
          <p>
            <span className="font-semibold">Atualizado em:</span>{" "}
            {new Date(cliente.updatedAt).toLocaleString("pt-BR")}
          </p>
        </div>
      </div>
    </>
  );
}
