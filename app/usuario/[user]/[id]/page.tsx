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
import { useParams, useRouter } from "next/navigation";
import { pessoaSchema } from "@/utils/zod/schemas/pessoa.schema";
import { clienteSchema } from "@/utils/zod/schemas/cliente.schema";

type FormConsultor = {
  nome: string;
  email: string;
  telefone: string;
  clienteId: string;
  especialidade: string;
};

export default function Cadastro() {
  const params = useParams();
  const id = params?.id as string;
  const user = params?.user as string;

  const router = useRouter();
  const [loading, setLoading] = useState({ on: false, label: "" });
  const [errorSubmit, setErrorSubmit] = useState(null);

  const schemaDefault = user === "consultor" ? consultorSchema : clienteSchema;

  const methods = useForm({
    resolver: zodResolver(schemaDefault),
    mode: "onChange",
  });

  const {
    formState: { errors },
  } = methods;

  useEffect(() => {
    const getUsuario = async () => {
      setErrorSubmit(null);
      setLoading({ on: true, label: "buscando..." });
      try {
        let response = null;
        if (user === "consultor") {
          response = await api.get(`/consultor`, { params: { id } });
        } else {
          response = await api.get(`/cliente`, { params: { id } });
        }

        if (response.data.pessoa.createdAt) {
          delete response.data.pessoa.createdAt;
        }

        if (response.data.pessoa.updatedAt) {
          delete response.data.pessoa.updatedAt;
        }
        if (response.data) {
          methods.reset(response.data);
        }
      } catch (error: any) {
        setErrorSubmit(error?.response?.data?.message ?? "Erro ao cadastrar");
        console.error("Erro ao buscar usuário:", error.message || error.data);
      } finally {
        setLoading({ on: false, label: "" });
      }
    };
    if (id) getUsuario();
  }, [id, methods]);

  const onSubmit = async (data: any) => {
    setErrorSubmit(null);
    setLoading({ on: true, label: id ? "Editando..." : "Cadastrando" });
    try {
      const response = await api.post(`/usuario`, data);

      if (response.data) await router.push(`/dashboard/${user}`);
    } catch (error: any) {
      setErrorSubmit(error?.response?.data?.message ?? "Erro ao cadastrar");
      console.error("Erro ao cadastrar cliente:", error.message || error.data);
    } finally {
      setLoading({ on: false, label: "" });
    }
  };

  return (
    <HeaderForm form={methods} onSubmit={onSubmit} type="Editar">
      <div className="min-h-screen p-8 flex justify-center items-start">
        <div className=" shadow-md rounded-2xl p-8 w-full max-w-3xl relative">
          {/* Loading Overlay */}
          {loading.on && (
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
                <span className="text-white font-medium mt-2">Buscando...</span>
              </div>
            </div>
          )}
          <h1 className="text-2xl mb-6">Editar usuário</h1>

          <p className="text-red-500 my-4">{errorSubmit}</p>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              name="pessoa.tipoUsuario"
              orientation="vertical"
              label="Tipo do usuário"
              placeholder="Selecione o tipo do usuário"
              selectProps={{
                classNameContainer: "col-span-full",
                disabled: loading.on,
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
              inputProps={{
                placeholder: "Digite o nome",
                disabled: loading.on,
              }}
              placeholder="Digite o nome completo"
            />

            <FormInput
              name="pessoa.telefone"
              label="Telefone"
              orientation="vertical"
              placeholder="(00) 00000-0000"
              inputProps={{
                placeholder: "Digite o telefone",
                disabled: loading.on,
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
                disabled: loading.on,
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
                          disabled: loading.on,
                        }}
                      />
                      <FormInput
                        name="pessoa.cpf"
                        label="CPF"
                        orientation="vertical"
                        type="cpf"
                        inputProps={{
                          placeholder: "00/00/0000",
                          disabled: loading.on,
                        }}
                      />
                      <FormInput
                        name="pessoa.endereco.cep"
                        label="CEP"
                        orientation="vertical"
                        type="cep"
                        maskProps={{ mask: "000000-000" }}
                        inputProps={{
                          placeholder: "000000-000",
                          disabled: loading.on,
                        }}
                      />

                      <FormSelect
                        name="pessoa.endereco.estado"
                        label="Estado"
                        orientation="vertical"
                        selectProps={{ disabled: loading.on }}
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
                        name="pessoa.endereco.rua"
                        label="Digite o endereço"
                        orientation="vertical"
                        inputProps={{
                          classNameContainer: "col-span-full",
                          disabled: loading.on,
                        }}
                      />

                      <FormInput
                        name="pessoa.endereco.complemento"
                        label="Digite o complemento"
                        orientation="vertical"
                        inputProps={{
                          classNameContainer: "col-span-full",
                          disabled: loading.on,
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
                        selectProps={{ disabled: loading.on }}
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
