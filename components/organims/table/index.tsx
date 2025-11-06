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
    e: any // generic for td/card click
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

  // helpers for cell value display
  function getDisplayValue(value: any) {
    if (value instanceof Date) {
      const day = value.getDate().toString().padStart(2, "0");
      const month = (value.getMonth() + 1).toString().padStart(2, "0");
      const year = value.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return value ?? "-";
  }

  return (
    <div className="overflow-x-auto">
      {/* Desktop Table */}
      <table className="min-w-full border-collapse hidden md:table">
        <thead>
          <tr className="bg-[#131313] text-white text-left border-2 border-[#222729]">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`py-8 px-4 font-semibold text-sm uppercase tracking-wide border-b border-[#222729] ${column.className || ""}`}
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
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="py-8 px-4 text-sm text-[#B0B7BE]"
                  >
                    {getDisplayValue(row[col.key])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center text-gray-500 py-8">
                Nenhum registro encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {data.length > 0 ? (
          data.map((row, index) => (
            <div
              key={index}
              className="bg-[#18191b] border border-[#222729] rounded-lg p-4 cursor-pointer shadow transition hover:bg-[#222229]"
              onClick={(e) => handleRowClick(row, index, e)}
              tabIndex={0}
            >
              {columns.map((col) => (
                <div key={col.key} className="flex justify-between items-center py-1 border-b border-[#222729] last:border-b-0">
                  <span className="font-semibold text-xs uppercase text-[#B0B7BE]">{col.label}</span>
                  <span className="text-sm text-[#E6EAF0] ml-4">{getDisplayValue(row[col.key])}</span>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            Nenhum registro encontrado.
          </div>
        )}
      </div>
      {renderPagination()}
    </div>
  );
}
