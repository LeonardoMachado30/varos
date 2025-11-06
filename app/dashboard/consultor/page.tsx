// src/app/consultor/dashboard/clientes/page.tsx

// 1. Importar o Suspense
import { Suspense } from "react";
import Table from "@/components/organims/table";
import { getConsultor } from "./actions";
import { SearchGroup } from "@/components/organims/group/SearchGroup";
import { PrimaryButton } from "@/components/atomic/button/PrimaryButton";
import Image from "next/image";
import iconAdd from "@/components/atomic/icon/add.svg";
import TotalClientes from "@/components/molecules/metrics/TotalClientes";
import LoadingTable from "@/components/organims/table/loading";

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

interface TabelaDeClientesProps {
  filters: object;
  page: number;
}

async function TabelaDeClientes({ filters, page }: TabelaDeClientesProps) {
  const clientesResponse = await getConsultor({ search: filters, page });

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
          hrefBase="/consultor"
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

  const suspenseKey = JSON.stringify(filters) + page;

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

          <SearchGroup type="consultor" />
        </div>
      </div>

      <Suspense key={suspenseKey} fallback={<LoadingTable />}>
        <TabelaDeClientes filters={filters} page={page} />
      </Suspense>
    </div>
  );
}
