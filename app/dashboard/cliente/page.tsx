// src/app/consultor/dashboard/clientes/page.tsx
import Image from "next/image";
import { Suspense } from "react";
import { getClientes } from "./actions";
import { SearchGroup } from "@/components/organims/group/SearchGroup";
import { PrimaryButton } from "@/components/atomic/button/PrimaryButton";
import Table from "@/components/organims/table";
import TotalClientes from "@/components/molecules/metrics/TotalClientes";
import LoadingTable from "@/components/organims/table/loading";

import iconAdd from "@/components/atomic/icon/add.svg";

interface Props {
  searchParams: Promise<{ search?: string; page?: string }>;
}

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

interface ClientesTableProps {
  filters: object;
  page: number;
}

async function ClientesTable({ filters, page }: ClientesTableProps) {
  const clientesResponse = await getClientes({ search: filters, page });

  return (
    <>
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
    </>
  );
}

interface Props {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default async function Dashboard({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams?.page || 1);
  let filters = {};
  const suspenseKey = JSON.stringify(filters) + page;

  if (resolvedParams?.search) {
    try {
      filters = JSON.parse(resolvedParams.search);
    } catch {
      filters = {};
    }
  }

  return (
    <div className="max-w-[1550px] mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

      <div className="flex items-center md:flex-row justify-between gap-2 mb-6 flex-col">
        <TotalClientes />

        <div className="flex items-center md:justify-end md:items-end flex-col gap-2">
          <PrimaryButton
            href="/usuario"
            className="w-full md:max-w-[171px] p-4 rounded-lg"
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

          <SearchGroup type="cliente" />
        </div>
      </div>

      <Suspense key={suspenseKey} fallback={<LoadingTable />}>
        <ClientesTable filters={filters} page={page} />
      </Suspense>
    </div>
  );
}
