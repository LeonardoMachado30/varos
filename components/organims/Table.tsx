// src/components/Table.tsx
import React from "react";

export default function Table({ data }: { data?: any[] }) {
  const rows = data || [
    { id: 1, nome: "Flávio Pádua", email: "flavio@teste.com", status: "Ativo" },
    { id: 2, nome: "João Silva", email: "joao@teste.com", status: "Inativo" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-[var(--primary)] text-white text-left">
            <th className="py-3 px-4 rounded-tl-lg">Nome</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4 rounded-tr-lg">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((item) => (
            <tr
              key={item.id}
              className="border-b border-[var(--border-color)] hover:bg-[var(--bg-light)] transition"
            >
              <td className="py-3 px-4">{item.nome}</td>
              <td className="py-3 px-4">{item.email}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    item.status === "Ativo"
                      ? "bg-green-100 text-[var(--success)]"
                      : "bg-red-100 text-[var(--error)]"
                  }`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
