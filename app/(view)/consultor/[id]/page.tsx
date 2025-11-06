// src/app/consultor/dashboard/cliente/[id]/page.tsx
import { getConsultorById } from "./actions";
import ButtonGroup from "@/components/organims/group/ButtonGroup";

interface ConsultorPageProps {
  params: {
    id: string; // O ID será sempre uma string, mesmo que seja um número
  };
}

export default async function ConsultorPage({ params }: ConsultorPageProps) {
  const consultorParams = await params;
  const consultor = await getConsultorById(consultorParams.id);

  if (!consultor) {
    return null;
  }

  const { pessoa } = consultor;

  return (
    <>
      <ButtonGroup url={`/usuario/consultor/${consultor.pessoa.id}`} />

      <div className="max-w-xl mx-auto py-10 px-4">
        <h1 className="text-3xl mb-4">Detalhes do Consultor</h1>

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
          <div>
            <span className="font-semibold">Endereço:</span>
            {pessoa.endereco ? (
              <ul className="list-disc ml-6">
                {pessoa.endereco.rua && (
                  <li>
                    <span className="font-semibold">Rua:</span>{" "}
                    {pessoa.endereco.rua}
                  </li>
                )}
                {pessoa.endereco.numero && (
                  <li>
                    <span className="font-semibold">Número:</span>{" "}
                    {pessoa.endereco.numero}
                  </li>
                )}
                {pessoa.endereco.bairro && (
                  <li>
                    <span className="font-semibold">Bairro:</span>{" "}
                    {pessoa.endereco.bairro}
                  </li>
                )}
                {pessoa.endereco.cidade && (
                  <li>
                    <span className="font-semibold">Cidade:</span>{" "}
                    {pessoa.endereco.cidade}
                  </li>
                )}
                {pessoa.endereco.estado && (
                  <li>
                    <span className="font-semibold">Estado:</span>{" "}
                    {pessoa.endereco.estado}
                  </li>
                )}
                {pessoa.endereco.cep && (
                  <li>
                    <span className="font-semibold">CEP:</span>{" "}
                    {pessoa.endereco.cep}
                  </li>
                )}
                {pessoa.endereco.complemento && (
                  <li>
                    <span className="font-semibold">Complemento:</span>{" "}
                    {pessoa.endereco.complemento}
                  </li>
                )}
                {/* Caso não haja nenhuma informação de endereço */}
                {!pessoa.endereco.rua &&
                  !pessoa.endereco.numero &&
                  !pessoa.endereco.bairro &&
                  !pessoa.endereco.cidade &&
                  !pessoa.endereco.estado &&
                  !pessoa.endereco.cep &&
                  !pessoa.endereco.complemento && <li>-</li>}
              </ul>
            ) : (
              "-"
            )}
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto py-10 px-4">
        <h1 className="text-3xl mb-4">Clientes</h1>

        {Array.isArray(consultor.clientes) && consultor.clientes.length > 0 ? (
          <div className="flex flex-col gap-6">
            {consultor.clientes.map((cliente) => (
              <div
                key={cliente.id}
                className="bg-[#131516] text-[#B0B7BE] border-[#222729] border p-6 rounded-lg shadow flex gap-3 flex-col"
              >
                <p>
                  <span className="font-semibold">Nome:</span>{" "}
                  {cliente.pessoa?.nome || "-"}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {cliente.pessoa?.email || "-"}
                </p>
                <p>
                  <span className="font-semibold">Telefone:</span>{" "}
                  {cliente.pessoa?.telefone || "-"}
                </p>
                <p>
                  <span className="font-semibold">CPF:</span>{" "}
                  {cliente.pessoa?.cpf || "-"}
                </p>
                <p>
                  <span className="font-semibold">Idade:</span>{" "}
                  {cliente.pessoa?.idade ?? "-"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#131516] text-[#B0B7BE] border-[#222729] border p-6 rounded-lg shadow flex gap-3 flex-col">
            <p className="text-center text-gray-400">
              Nenhum cliente cadastrado.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
