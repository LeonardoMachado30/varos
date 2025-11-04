// src/components/Table.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface Column {
  label: string;
  key: string;
  className?: string;
}

interface PaginationProps {
  page: number;
  perPage: number;
  totalRegistros: number;
  totalPaginas: number;
}

interface TableProps {
  data?: any[];
  columns: Column[];
  hrefBase?: string;
  onRowClick?: (
    row: any,
    index: number,
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => void;
  pagination?: PaginationProps;
}

export default function Table({
  data = [],
  columns,
  hrefBase,
  onRowClick,
  pagination,
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

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`);
  };

  const renderPagination = () => {
    if (!pagination) return null;
    const { page, totalPaginas } = pagination;

    const prevDisabled = page <= 1;
    const nextDisabled = page >= totalPaginas;

    return (
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={prevDisabled}
          className={`rounded px-3 py-2 text-sm font-semibold border ${
            prevDisabled
              ? "text-gray-400 border-gray-700 cursor-not-allowed"
              : "text-white border-[#222729] hover:bg-[#18191b]"
          }`}
        >
          Anterior
        </button>
        <span className="text-[#B0B7BE] text-sm">
          Página {page} de {totalPaginas}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={nextDisabled}
          className={`rounded px-3 py-2 text-sm font-semibold border ${
            nextDisabled
              ? "text-gray-400 border-gray-700 cursor-not-allowed"
              : "text-white border-[#222729] hover:bg-[#18191b]"
          }`}
        >
          Próxima
        </button>
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-[#131313] text-white text-left border-2 border-[#222729]">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`py-8 px-4 font-semibold text-sm uppercase tracking-wide border-b border-[#222729] ${
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
                className="bg-[#131516] border-b border-[#222729] cursor-pointer hover:bg-[#18191b] transition-colors "
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
                      className="py-8 px-4 text-sm text-[#B0B7BE]"
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
      {/* Controles de paginação */}
      {renderPagination()}
    </div>
  );
}
