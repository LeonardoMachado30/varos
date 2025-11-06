"use server";

import { getClienteMetricas7Dias } from "./actions";

export default async function TotalClientes() {
  const totalClientes = await getClienteMetricas7Dias();

  return (
    <div className="flex flex-col gap-2 bg-[#131516] text-[#B0B7BE] border-[#222729] border p-4 md:max-w-[212px] max-h-[137px] h-full w-full">
      <p>Total de clientes</p>
      <p className="text-4xl">{totalClientes}</p>
      <p>nas últimos 7 dias</p>
    </div>
  );
}
