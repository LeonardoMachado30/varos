import React from "react";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-semibold text-blue-600">145</span>
          <span className="mt-2 text-gray-600">Novos Clientes</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-semibold text-green-600">32</span>
          <span className="mt-2 text-gray-600">Consultores Ativos</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-2xl font-semibold text-purple-600">27</span>
          <span className="mt-2 text-gray-600">Atendimentos Hoje</span>
        </div>
      </section>
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Resumo</h2>
        <p className="text-gray-700">
          Bem-vindo ao painel de controle! Aqui você pode visualizar
          informações-chave sobre seus clientes, consultores e atendimentos
          diários.
        </p>
      </section>
    </main>
  );
}
