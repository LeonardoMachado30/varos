"use client";

import { useForm, FormProvider } from "react-hook-form";
import { FormInput } from "@/components/atomic/input/FormInput";
import { FormSelect } from "@/components/atomic/input/FormSelect";
import { PrimaryButton } from "@/components/atomic/button/PrimaryButton";

type FormConsultor = {
  nome: string;
  email: string;
  telefone: string;
  clienteId: string;
  especialidade: string;
};

export default function Cadastro() {
  const methods = useForm<FormConsultor>({
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      clienteId: "",
      especialidade: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: FormConsultor) => {
    console.log("🔹 Dados do consultor:", data);
  };

  return (
    <div className="min-h-screen p-8 flex justify-center items-start">
      <div className=" shadow-md rounded-2xl p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-semibold mb-6">Cadastro de Consultor</h1>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <FormInput
              name="nome"
              label="Nome do Consultor"
              placeholder="Digite o nome completo"
            />

            <FormInput
              name="email"
              label="E-mail"
              type="email"
              placeholder="exemplo@email.com"
            />

            <FormInput
              name="telefone"
              label="Telefone"
              placeholder="(00) 00000-0000"
              maskProps={{
                mask: "(00) 00000-0000",
              }}
            />

            <FormSelect
              name="especialidade"
              label="Especialidade"
              placeholder="Selecione a especialidade"
            >
              <option value="">Selecione...</option>
              <option value="rh">Recursos Humanos</option>
              <option value="tecnologia">Tecnologia</option>
              <option value="comercial">Comercial</option>
              <option value="financeiro">Financeiro</option>
            </FormSelect>

            <FormSelect
              name="clienteId"
              label="Cliente Associado"
              placeholder="Selecione o cliente"
            >
              <option value="">Selecione...</option>
              <option value="1">Cliente A</option>
              <option value="2">Cliente B</option>
              <option value="3">Cliente C</option>
            </FormSelect>

            <div className="md:col-span-2 flex justify-end mt-2">
              <PrimaryButton type="submit" className="w-48">
                Cadastrar Consultor
              </PrimaryButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
