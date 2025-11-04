// src/app/consultor/dashboard/clientes/page.tsx
import Table from "@/components/organims/Table";
import { getClientes } from "./actions";
import { SearchGroup } from "@/components/organims/group/SearchGroup";
import { PrimaryButton } from "@/components/atomic/button/PrimaryButton";
import Image from "next/image";
import iconAdd from "@/components/atomic/icon/add.svg";
import TotalClientes from "@/components/molecules/metrics/TotalClientes";

interface Props {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default async function Dashboard({ searchParams }: Props) {
  const resolvedParams = await searchParams;

  const page = Number(resolvedParams?.page || 1);
  let filters = {};

  if (resolvedParams?.search) {
    try {
      filters = JSON.parse(resolvedParams.search);
    } catch {
      filters = {};
    }
  }
  const clientesResponse = await getClientes({ search: filters, page });

  const columns = [
    { label: "nome", key: "nome" },
    { label: "email", key: "email" },
    { label: "telefone", key: "telefone" },
    { label: "CPF", key: "cpf" },
    { label: "Idade", key: "idade" },
    {
      label: "Endereço",
      key: "endereco",
    },
    { label: "Criado em", key: "createdAt" },
    { label: "Atualizado em", key: "updatedAt" },
  ];

  return (
    <div className="max-w-[1550px] mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

      <div className="flex flex-row justify-between gap-2">
        <TotalClientes />

        <div className="flex justify-end items-end flex-col gap-2  mb-6">
          <PrimaryButton
            href="/cadastro/usuario"
            className="max-w-[171px] p-4 rounded-lg"
          >
            <span className="flex items-center gap-2">
              Criar usuário
              <Image
                src={iconAdd}
                alt="Adicionar"
                width={20}
                height={20}
                priority
              />
            </span>
          </PrimaryButton>

          <SearchGroup />
        </div>
      </div>

      {clientesResponse.data.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          Nenhum cliente encontrado.
        </div>
      ) : (
        <Table
          data={clientesResponse.data}
          columns={columns}
          hrefBase="/cliente"
          pagination={{
            page: clientesResponse.page,
            perPage: clientesResponse.perPage,
            totalRegistros: clientesResponse.totalRegistros,
            totalPaginas: clientesResponse.totalPaginas,
          }}
        />
      )}
    </div>
  );
}
