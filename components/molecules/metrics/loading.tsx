export default function LoadingClientesMetric() {
  return (
    <div className="flex flex-col gap-2 bg-[#131516] border border-[#222729] p-4 max-w-[212px] max-h-[137px] h-full w-full rounded-lg animate-pulse">
      <p className="text-[#B0B7BE]">Total de clientes</p>
      <div className="h-10 bg-[#222729] rounded-md w-16 mt-1" />
      <p className="text-[#555]">nas últimos 7 dias</p>
    </div>
  );
}
