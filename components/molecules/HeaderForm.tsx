"use client";

import Image from "next/image";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { PrimaryButton } from "../atomic/button/PrimaryButton";

type HeaderFormProps<T extends Record<string, any> = any> = {
  children: React.ReactNode;
  form?: any;
  formProps?: any;
  onSubmit: (values: T) => void;
};

export default function HeaderForm<T extends Record<string, any> = any>({
  children,
  form,
  formProps,
  onSubmit,
}: HeaderFormProps<T>) {
  // Se não receber 'form', cria localmente
  const methods = form ?? useForm<T>(formProps);

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : undefined}>
        <header className="w-full border-b border-gray-800  shadow-sm sticky top-0 z-30 py-4">
          <div className="mx-auto px-6 py-4 flex items-center justify-end text-gray-400 h-full gap-1">
            <PrimaryButton type="submit" className="rounded-4xl" size="lg">
              Criar usuário
            </PrimaryButton>
            <PrimaryButton color="secondary" className="rounded-4xl" size="lg">
              Deletar usuário
            </PrimaryButton>
          </div>
        </header>

        {children}
      </form>
    </FormProvider>
  );
}
