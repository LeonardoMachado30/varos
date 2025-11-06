"use client";

import { FormInput } from "@/components/atomic/input/FormInput";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useRef, useTransition } from "react";

interface Search {
  nome?: string;
  email?: string;
  periodo?: string;
}

export function SearchGroup({ type = "consultor" }: { type?: string }) {
  const [filters, setFilters] = useState<Search>({});
  const [loadingField, setLoadingField] = useState<keyof Search | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const searchParam = searchParams.get("search");
    if (searchParam) {
      try {
        const parsed = JSON.parse(searchParam);
        const obj: Search = {
          nome: parsed.nome ?? "",
          email: parsed.email ?? "",
          periodo: parsed.periodo ?? "",
        };
        setFilters(obj);
      } catch {
        setFilters({});
      }
    } else {
      setFilters({});
    }
  }, [searchParams]);

  const handleChange = useCallback(
    (key: keyof Search, value: string) => {
      const newFilters = { ...filters, [key]: value };
      setFilters(newFilters);
      setLoadingField(key);

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams);
        const stringified = JSON.stringify(newFilters);

        if (Object.values(newFilters).some((v) => v?.trim() !== "")) {
          params.set("search", stringified);
        } else {
          params.delete("search");
        }

        params.set("page", "1");

        startTransition(() => {
          router.push(`?${params.toString()}`);
          setLoadingField(null);
        });
      }, 500);
    },
    [filters, router, searchParams]
  );

  return (
    <div className="flex flex-col md:flex-row items-center justify-center border-2 border-[#222729] gap-6 rounded-lg max-w-[875px] px-6 py-3">
      {/* Campo Nome */}
      <div className="relative flex items-center w-full">
        <FormInput
          label={`Nome do ${type}`}
          name="nome"
          inputProps={{
            value: filters.nome ?? "",
            onChange: (e) => handleChange("nome", e as any),
          }}
        />
        {loadingField === "nome" && (
          <div className="absolute right-2 top-3">
            <div className="w-4 h-4 border-2 border-t-transparent border-gray-400 rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Campo Email */}
      <div className="relative flex items-center w-full">
        <FormInput
          label={`Email do ${type}`}
          name="email"
          inputProps={{
            value: filters.email ?? "",
            onChange: (e) => handleChange("email", e as any),
          }}
        />
        {loadingField === "email" && (
          <div className="absolute right-2 top-3">
            <div className="w-4 h-4 border-2 border-t-transparent border-gray-400 rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Campo Período */}
      <div className="relative flex items-center w-full">
        <FormInput
          label="Período"
          name="periodo"
          inputProps={{
            value: filters.periodo ?? "",
            onChange: (e) => handleChange("periodo", e as any),
          }}
        />
        {loadingField === "periodo" && (
          <div className="absolute right-2 top-3">
            <div className="w-4 h-4 border-2 border-t-transparent border-gray-400 rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
