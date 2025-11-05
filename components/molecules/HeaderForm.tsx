"use client";

import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import { PrimaryButton } from "../atomic/button/PrimaryButton";
import Link from "next/link";

type HeaderFormProps<T extends Record<string, any> = any> = {
  children: React.ReactNode;
  form?: any;
  formProps?: any;
  onSubmit: (values: T) => void;
  type?: string;
};

export default function HeaderForm<T extends Record<string, any> = any>({
  children,
  form,
  formProps,
  onSubmit,
  type = "Criar",
}: HeaderFormProps<T>) {
  const methods = form ?? useForm<T>(formProps);

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : undefined}>
        <header className="w-full border-b border-gray-800  shadow-sm sticky top-0 z-30 py-4">
          <div className="mx-auto px-6 py-4 flex items-center justify-between text-gray-400 h-full gap-1">
            <Link href="/dashboard/cliente">
              <Image src="/logo.svg" width={100} height={40} alt="logo" />
            </Link>
            <div className="flex gap-2">
              <PrimaryButton type="submit" className="rounded-4xl" size="lg">
                {type} usuário
              </PrimaryButton>
              <PrimaryButton
                color="secondary"
                className="rounded-4xl"
                size="lg"
              >
                Deletar usuário
              </PrimaryButton>
            </div>
          </div>
        </header>

        {children}
      </form>
    </FormProvider>
  );
}
