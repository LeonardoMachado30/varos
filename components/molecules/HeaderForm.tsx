"use client";

import { FormProvider, useForm } from "react-hook-form";
import HeaderButtonGroup from "../organims/group/HeaderButtonGroup";

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
        <HeaderButtonGroup
          type="cliente"
          buttons={[
            {
              label: `${type} usuario`,
              type: "submit",
              color: "primary",
              size: "lg",
            },
            {
              label: "Remover usuario",
              type: "button",
              color: "secondary",
              size: "lg",
            },
          ]}
        />

        {children}
      </form>
    </FormProvider>
  );
}
