// src/components/Table.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface Column {
  label: string;
  key: string;
  className?: string;
}

interface TableProps {
  data?: any[];
  columns: Column[];
  hrefBase?: string; // 👈 Novo: navegação automática por ID
  onRowClick?: (
    row: any,
    index: number,
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void;
}

export default function Table({
  data = [],
  columns,
  hrefBase,
  onRowClick,
}: TableProps) {
  const router = useRouter();

  const handleRowClick = (
    row: any,
    index: number,
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    if (onRowClick) {
      onRowClick(row, index, e);
    } else if (hrefBase) {
      router.push(`${hrefBase}/${row.id}`);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-[#131313] text-white text-left border-2 border-[#222729]">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`py-4 px-4 font-semibold text-sm uppercase tracking-wide border-b border-[#222729] ${
                  column.className || ""
                }`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={index}
                tabIndex={0}
                className="bg-[#131516] border-b border-[#222729] cursor-pointer hover:bg-[#18191b] transition-colors"
                onClick={(e) => handleRowClick(row, index, e)}
              >
                {columns.map((col) => {
                  const value = row[col.key];

                  let displayValue = value;
                  if (value instanceof Date) {
                    const day = value.getDate().toString().padStart(2, "0");
                    const month = (value.getMonth() + 1)
                      .toString()
                      .padStart(2, "0");
                    const year = value.getFullYear();
                    displayValue = `${day}/${month}/${year}`;
                  }

                  return (
                    <td
                      key={col.key}
                      className="py-3 px-4 text-sm text-[#B0B7BE]"
                    >
                      {displayValue ?? "-"}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center text-gray-500 py-8"
              >
                Nenhum registro encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
