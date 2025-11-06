import LoadingTable from "@/components/organims/table/loading";

export default function LoadingClientes() {
  return (
    <div className="max-w-[1550px] mx-auto py-10 px-4 animate-pulse">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

      <div className="flex flex-col md:flex-row justify-between gap-2 ">
        <div className="flex flex-col gap-2 bg-[#131516] text-[#B0B7BE] border-[#222729] border p-4 max-h-[220px] md:max-h-[137px] h-full w-full rounded-lg">
          <p>Total de clientes</p>
          <div className="h-10 bg-[#222729] rounded-md w-24" />
          <p>nas últimos 7 dias</p>
        </div>

        <div className="flex justify-end items-end flex-col gap-2 ">
          <div className="md:w-[171px] h-[60px] md:h-[48px] bg-[#222729] rounded-lg w-full" />
          <div className="md:w-[875px] h-[200px] md:h-[72px] bg-[#222729] rounded-lg  w-full" />
        </div>
      </div>

      <LoadingTable />
    </div>
  );
}
