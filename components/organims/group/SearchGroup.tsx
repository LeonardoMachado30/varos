"use client";

import { FormInput } from "@/components/atomic/input/FormInput";
import { useState } from "react";

interface Props {
  handleChange?: (data: any) => any;
}

export function SearchGroup({ handleChange }: Props) {
  const [nomeConsultor, setNomeConsultor] = useState("");
  const [emailConsultor, setEmailConsultor] = useState("");
  const [periodo, setPeriodo] = useState<string>("");

  return (
    <section className="flex items-center justify-center border-2 border-[#222729] px-6 mb-6 gap-6 rounded-lg max-w-[875px] h-[72px]">
      <FormInput
        label="Nome do consultor"
        name="nome"
        inputProps={{
          value: nomeConsultor,
          onChange: (e) => {
            setNomeConsultor(e as unknown as any);
            if (handleChange) handleChange(e.target.value);
          },
        }}
      ></FormInput>
      <FormInput
        label="Email do consultor"
        name="email"
        inputProps={{
          value: emailConsultor,
          onChange: (e) => {
            setEmailConsultor(e as unknown as any);
            if (handleChange) handleChange(e.target.value);
          },
        }}
      ></FormInput>
      <FormInput
        label="Período"
        name="periodo"
        inputProps={{
          value: periodo,
          onChange: (e) => {
            setPeriodo(e as unknown as any);
            if (handleChange) handleChange(e.target.value);
          },
        }}
      ></FormInput>
    </section>
  );
}
