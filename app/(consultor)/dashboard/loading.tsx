export default function LoadingClientes() {
  return (
    <div className="max-w-[1550px] mx-auto py-10 px-4 animate-pulse">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2 bg-[#131516] text-[#B0B7BE] border-[#222729] border p-4 max-w-[212px] max-h-[137px] h-full w-full rounded-lg">
          <p>Total de clientes</p>
          <div className="h-10 bg-[#222729] rounded-md w-24" />
          <p>nas últimos 7 dias</p>
        </div>

        <div className="flex justify-end items-end flex-col gap-2">
          <div className="w-[171px] h-[48px] bg-[#222729] rounded-lg" />
          <div className="w-[875px] h-[72px] bg-[#222729] rounded-lg" />
        </div>
      </div>

      <div className="mt-8">
        <div className="h-[400px] bg-[#1a1c1d] border border-[#222729] rounded-lg" />
      </div>
    </div>
  );
}
