"use client";

import { useForm, useFormContext } from "react-hook-form";
import { FormInput } from "@/components/atomic/input/FormInput";
import { FormSelect } from "@/components/atomic/input/FormSelect";
import { Tabs } from "@/components/molecules/Tabs";
import HeaderForm from "@/components/molecules/HeaderForm";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { consultorSchema } from "@/utils/zod/schemas/consultor.schema";
import api from "@/axios";
import { useRouter } from "next/navigation";
import { ErrorMessage } from "@/components/atomic/input/ErrorMessage";

type FormConsultor = {
  nome: string;
  email: string;
  telefone: string;
  clienteId: string;
  especialidade: string;
};

export default function Cadastro() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(null);

  // Mocked data to represent the properties/objects expected for submit
  const methods = useForm({
    resolver: zodResolver(consultorSchema),
    mode: "onChange",
    defaultValues: {
      pessoa: {
        tipoUsuario: "CONSULTOR",
        nome: "Maria Mockada",
        telefone: "11 99999-9999",
        email: "maria.consultora@email.com",
        idade: 32,
        cpf: "123.456.789-00",
        endereco: {
          cep: "123456-123",
          estado: "SP",
          endereco: "Rua das Oliveiras, 123",
          complemento: "Apto 23",
        },
      },
      // clientes: ["cliente1", "cliente2"]
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  handleSubmit((params) => {
    console.log(params);
  });

  const onSubmit = async (data: any) => {
    setErrorSubmit(null);
    setLoading(true);
    try {
      const response = await api.post(`/api/clientes`, data);

      console.log(response);
      await router.push("/dashboard");
    } catch (error: any) {
      setErrorSubmit(error?.response?.data?.message ?? "Erro ao cadastrar");
      console.error("Erro ao cadastrar cliente:", error.message || error.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HeaderForm form={methods} onSubmit={onSubmit}>
      <div className="min-h-screen p-8 flex justify-center items-start">
        <div className=" shadow-md rounded-2xl p-8 w-full max-w-3xl relative">
          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 z-20 bg-black/60 flex items-center justify-center rounded-2xl">
              <div className="flex flex-col items-center">
                <svg
                  className="animate-spin h-10 w-10 text-white mb-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                <span className="text-white font-medium mt-2">Salvando...</span>
              </div>
            </div>
          )}
          <h1 className="text-2xl mb-6">Criar usuário</h1>

          <p className="text-red-500 my-4">{errorSubmit}</p>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              name="pessoa.tipoUsuario"
              orientation="vertical"
              label="Tipo do usuário"
              placeholder="Selecione o tipo do usuário"
              selectProps={{
                classNameContainer: "col-span-full",
                disabled: loading,
              }}
            >
              <option value="CLIENTE">CLIENTE</option>
              <option value="CONSULTOR">CONSULTOR</option>
            </FormSelect>

            <FormInput
              name="pessoa.nome"
              orientation="vertical"
              label="Nome do Consultor"
              maskProps={{ mask: /^[A-Za-zÀ-ÿ\s]*$/ }}
              inputProps={{ placeholder: "Digite o nome", disabled: loading }}
              placeholder="Digite o nome completo"
            />

            <FormInput
              name="pessoa.telefone"
              label="Telefone"
              orientation="vertical"
              placeholder="(00) 00000-0000"
              inputProps={{
                placeholder: "Digite o telefone",
                disabled: loading,
              }}
              maskProps={{
                mask: "00 00000-0000",
              }}
            />

            <FormInput
              name="pessoa.email"
              label="E-mail"
              orientation="vertical"
              type="email"
              inputProps={{
                placeholder: "Digite o nome",
                classNameContainer: "col-span-full",
                disabled: loading,
              }}
              placeholder="exemplo@email.com"
            />

            <Tabs
              defaultValue="basica"
              className="col-span-full mt-4"
              classNameContent="grid grid-cols-1 md:grid-cols-2 gap-6"
              tabs={[
                {
                  label: "Informações básica",
                  value: "basica",
                  content: (
                    <>
                      <FormInput
                        name="pessoa.idade"
                        label="Idade"
                        orientation="vertical"
                        type="Idade"
                        inputProps={{
                          placeholder: "28 anos",
                          disabled: loading,
                        }}
                      />
                      <FormInput
                        name="pessoa.cpf"
                        label="CPF"
                        orientation="vertical"
                        type="cpf"
                        inputProps={{
                          placeholder: "00/00/0000",
                          disabled: loading,
                        }}
                      />
                      <FormInput
                        name="endereco.cep"
                        label="CEP"
                        orientation="vertical"
                        type="cep"
                        maskProps={{ mask: "000000-000" }}
                        inputProps={{
                          placeholder: "000000-000",
                          disabled: loading,
                        }}
                      />

                      <FormSelect
                        name="endereco.estado"
                        label="Estado"
                        orientation="vertical"
                        selectProps={{ disabled: loading }}
                      >
                        <option value="">Selecione o estado</option>
                        <option value="AC">Acre (AC)</option>
                        <option value="AL">Alagoas (AL)</option>
                        <option value="AP">Amapá (AP)</option>
                        <option value="AM">Amazonas (AM)</option>
                        <option value="BA">Bahia (BA)</option>
                        <option value="CE">Ceará (CE)</option>
                        <option value="DF">Distrito Federal (DF)</option>
                        <option value="ES">Espírito Santo (ES)</option>
                        <option value="GO">Goiás (GO)</option>
                        <option value="MA">Maranhão (MA)</option>
                        <option value="MT">Mato Grosso (MT)</option>
                        <option value="MS">Mato Grosso do Sul (MS)</option>
                        <option value="MG">Minas Gerais (MG)</option>
                        <option value="PA">Pará (PA)</option>
                        <option value="PB">Paraíba (PB)</option>
                        <option value="PR">Paraná (PR)</option>
                        <option value="PE">Pernambuco (PE)</option>
                        <option value="PI">Piauí (PI)</option>
                        <option value="RJ">Rio de Janeiro (RJ)</option>
                        <option value="RN">Rio Grande do Norte (RN)</option>
                        <option value="RS">Rio Grande do Sul (RS)</option>
                        <option value="RO">Rondônia (RO)</option>
                        <option value="RR">Roraima (RR)</option>
                        <option value="SC">Santa Catarina (SC)</option>
                        <option value="SP">São Paulo (SP)</option>
                        <option value="SE">Sergipe (SE)</option>
                        <option value="TO">Tocantins (TO)</option>
                      </FormSelect>

                      <FormInput
                        name="endereco.endereco"
                        label="Digite o endereço"
                        orientation="vertical"
                        type="endereco"
                        inputProps={{
                          classNameContainer: "col-span-full",
                          disabled: loading,
                        }}
                      />

                      <FormInput
                        name="endereco.complemento"
                        label="Digite o complemento"
                        orientation="vertical"
                        type="complemento"
                        inputProps={{
                          classNameContainer: "col-span-full",
                          disabled: loading,
                        }}
                      />
                    </>
                  ),
                },
                {
                  label: "Adicionar clientes",
                  value: "clientes",
                  content: (
                    <>
                      <FormSelect
                        name="clientes[]"
                        label="Clientes"
                        orientation="vertical"
                        selectProps={{ disabled: loading }}
                      >
                        <option value="">Selecione o estado</option>
                      </FormSelect>
                    </>
                  ),
                },
              ]}
            />
          </section>
        </div>
      </div>
    </HeaderForm>
  );
}
