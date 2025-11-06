export default function LoadingClienteSkeleton() {
  return (
    <>
      <div className="w-full border-b border-gray-800 shadow-sm sticky top-0 z-30 py-4">
        <div className="mx-auto px-6 py-4 flex items-center justify-end gap-2 h-full">
          <div className="h-10 w-36 rounded-4xl bg-[#23272b] animate-pulse" />
          <div className="h-10 w-44 rounded-4xl bg-[#23272b] animate-pulse" />
        </div>
      </div>
      <div className="max-w-xl mx-auto py-10 px-4">
        <div className="h-9 w-60 bg-[#252a2f] rounded mb-6 animate-pulse" />
        <div className="bg-[#131516] text-[#B0B7BE] border-[#222729] border p-6 rounded-lg shadow space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold w-20">Nome:</span>
            <div className="h-5 w-44 bg-[#262a2e] rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold w-20">Email:</span>
            <div className="h-5 w-40 bg-[#262a2e] rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold w-20">Telefone:</span>
            <div className="h-5 w-32 bg-[#262a2e] rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold w-20">CPF:</span>
            <div className="h-5 w-32 bg-[#262a2e] rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold w-20">Idade:</span>
            <div className="h-5 w-12 bg-[#262a2e] rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold w-20">Endereço:</span>
            <div className="h-5 w-48 bg-[#262a2e] rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold w-28">Criado em:</span>
            <div className="h-5 w-32 bg-[#262a2e] rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold w-32">Atualizado em:</span>
            <div className="h-5 w-32 bg-[#262a2e] rounded animate-pulse" />
          </div>
        </div>
      </div>
    </>
  );
}
