// src/app/consultor/dashboard/clientes/page.tsx
import Table from "@/components/organims/Table";
import { getClientes } from "./actions";
import { FormInput } from "@/components/atomic/input/FormInput";
import { SearchGroup } from "@/components/organims/group/SearchGroup";
import { PrimaryButton } from "@/components/atomic/button/PrimaryButton";
import Image from "next/image";
import iconAdd from "@/components/atomic/icon/add.svg";

export default async function Dashboard() {
  const clientes = await getClientes();

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

      <div className="flex flex-row justify-between ">
        <div className="flex flex-col gap-2 bg-[#131516] text-[#B0B7BE] border-[#222729] border-[1px] p-4 max-w-[212px] max-h-[137px] h-full w-full">
          <p>Total de clientes</p>
          <p className="text-4xl">128</p>
          <p>nas últimos 7 dias</p>
        </div>

        <div className="flex justify-end items-end flex-col gap-2">
          <PrimaryButton
            href="/cadastro/usuario"
            className="max-w-[171px] p-4 rounded-lg"
            withIcon
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

      {clientes.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          Nenhum cliente encontrado.
        </div>
      ) : (
        <Table data={clientes} columns={columns} />
      )}
    </div>
  );
}
