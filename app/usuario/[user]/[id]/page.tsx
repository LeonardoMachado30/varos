"use client";

import { useForm } from "react-hook-form";
import { FormInput } from "@/components/atomic/input/FormInput";
import { FormSelect } from "@/components/atomic/input/FormSelect";
import { Tabs } from "@/components/molecules/Tabs";
import HeaderForm from "@/components/molecules/HeaderForm";
import { useCallback, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/axios";
import { useParams, useRouter } from "next/navigation";
import { pessoaSchema } from "@/utils/zod/schemas/pessoa.schema";

const FormBasics = ({ loading }: { loading: boolean }) => {
  return (
    <>
      <FormInput
        name="idade"
        label="Idade"
        orientation="vertical"
        type="number"
        inputProps={{
          placeholder: "28",
          disabled: loading,
        }}
      />
      <FormInput
        name="cpf"
        label="CPF"
        orientation="vertical"
        type="cpf"
        inputProps={{
          placeholder: "000.000.000-00",
          disabled: true,
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
        name="endereco.rua"
        label="Digite o endereço"
        orientation="vertical"
        inputProps={{
          classNameContainer: "col-span-full",
          disabled: loading,
        }}
      />

      <FormInput
        name="endereco.complemento"
        label="Digite o complemento"
        orientation="vertical"
        inputProps={{
          classNameContainer: "col-span-full",
          disabled: loading,
        }}
      />
    </>
  );
};

interface Cliente {
  id: string;
  nome: string;
  email?: string;
}

interface FormClientesProps {
  loading: boolean;
  onChangeSelected?: (ids: string[]) => void;
  initialClientes?: Cliente[];
}

const PAGE_SIZE = 10;

const FormClientes = ({
  loading,
  onChangeSelected,
  initialClientes = [],
}: FormClientesProps) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoadingClientes, setIsLoadingClientes] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedClientes, setSelectedClientes] =
    useState<Cliente[]>(initialClientes);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialClientes.length > 0) {
      setSelectedClientes(initialClientes);
    }
  }, [initialClientes]);

  const fetchClientes = useCallback(
    async (refresh = false) => {
      setIsLoadingClientes(true);
      try {
        const res = await api.get("/clientes", {
          params: {
            page: refresh ? 1 : page,
            limit: PAGE_SIZE,
            search: search.length > 0 ? search : undefined,
          },
        });

        const data = Array.isArray(res.data?.result)
          ? res.data.result
          : Array.isArray(res.data)
          ? res.data
          : [];

        setClientes((prev) => (refresh ? data : [...prev, ...data]));
        setHasMore(!(data.length < PAGE_SIZE));
        if (refresh) setPage(2);
        else setPage((prev) => prev + 1);
      } catch (e) {
        setHasMore(false);
      }
      setIsLoadingClientes(false);
    },
    [page, search]
  );

  useEffect(() => {
    setClientes([]);
    setPage(1);
    setHasMore(true);
    fetchClientes(true);
  }, [search]);

  const handleInputFocus = () => {
    setShowDropdown(true);
    fetchClientes(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
    setShowDropdown(true);
  };

  const handleClienteSelect = (cliente: Cliente) => {
    if (!selectedClientes.some((c) => c.id === cliente.id)) {
      const novasSelecoes = [...selectedClientes, cliente];
      setSelectedClientes(novasSelecoes);
      if (onChangeSelected) onChangeSelected(novasSelecoes.map((c) => c.id));
    }
    setShowDropdown(false);
    setSearch("");
    if (inputRef.current) inputRef.current.blur();
  };

  const handleRemoveSelected = (id: string) => {
    const novasSelecoes = selectedClientes.filter((c) => c.id !== id);
    setSelectedClientes(novasSelecoes);
    if (onChangeSelected) onChangeSelected(novasSelecoes.map((c) => c.id));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleClientesScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const div = e.currentTarget;
    if (
      !isLoadingClientes &&
      hasMore &&
      div.scrollHeight - div.scrollTop <= div.clientHeight + 10
    ) {
      fetchClientes();
    }
  };

  return (
    <div className="my-2">
      <label className="font-semibold block mb-1 text-primary">
        Selecione Cliente(s)
      </label>
      <div className="relative" style={{ outline: "none" }}>
        <div className="flex flex-wrap items-center gap-1 px-2 py-1 border rounded bg-[#131516] border-[#222729] min-h-[40px] w-full">
          {selectedClientes.map((cliente) => (
            <span
              key={cliente.id}
              className="flex items-center bg-primary/15 text-primary text-xs rounded-md px-2 py-0.5 mr-1 mb-1"
            >
              {cliente.nome}
              {cliente.email ? ` - ${cliente.email}` : ""}
              <button
                type="button"
                className="ml-1 text-xs text-red-500 hover:text-red-700"
                onClick={() => handleRemoveSelected(cliente.id)}
                tabIndex={-1}
              >
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            ref={inputRef}
            disabled={loading}
            className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-white min-w-[100px] py-1"
            placeholder={
              selectedClientes.length === 0
                ? "Buscar cliente pelo nome ou email"
                : ""
            }
            value={search}
            onChange={handleSearch}
            onFocus={handleInputFocus}
            style={{ minWidth: 100 }}
            autoComplete="off"
          />
        </div>
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 z-20 mt-1 rounded bg-[#131516] border border-[#222729] shadow max-h-60 overflow-y-auto"
            style={{ minWidth: "100%" }}
            onScroll={handleClientesScroll}
          >
            {isLoadingClientes && (
              <div className="py-2 text-center text-xs text-gray-500">
                Carregando clientes...
              </div>
            )}
            {!isLoadingClientes && clientes.length === 0 && (
              <div className="py-2 text-center text-xs text-gray-400">
                Nenhum cliente encontrado
              </div>
            )}
            {clientes.map((cliente) => (
              <div
                key={cliente.id}
                className={`cursor-pointer px-3 py-2 hover:bg-primary/10 transition-colors text-white text-sm ${
                  selectedClientes.some((c) => c.id === cliente.id)
                    ? "opacity-40 pointer-events-none"
                    : ""
                }`}
                onMouseDown={() => handleClienteSelect(cliente)}
              >
                {cliente.nome}
                {cliente.email ? ` - ${cliente.email}` : ""}
              </div>
            ))}
            {!isLoadingClientes && hasMore && (
              <div className="py-1 text-center text-xs text-gray-400">
                Role para carregar mais...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default function Editar() {
  const params = useParams();
  const id = params?.id as string;
  const user = params?.user as string;

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState<string | null>(null);
  const [tabsRender, setTabsRender] = useState([
    {
      label: "Informações básica",
      value: "basica",
      content: <FormBasics loading={loading} />,
    },
  ]);

  const methods = useForm({
    resolver: zodResolver(pessoaSchema),
    mode: "onChange",
  });

  const { watch, setValue, reset } = methods;
  const tipoUsuario = watch("tipoUsuario");

  // Busca dados do usuário para edição
  useEffect(() => {
    const getUsuario = async () => {
      if (!id) return;

      setErrorSubmit(null);
      setLoadingFetch(true);
      try {
        const endpoint = user === "consultor" ? "/consultor" : "/cliente";
        const response = await api.get("/usuario", { params: { id } });
        console.log(response);
        if (response.data) {
          const data = response.data;

          // Transforma dados do backend para o formato do formulário
          const formData: any = {
            id: data?.id,
            tipoUsuario: data?.tipoUsuario || "CLIENTE",
            nome: data?.nome || "",
            email: data?.email || "",
            telefone: data?.telefone || "",
            cpf: data?.cpf || "",
            idade: data?.idade || null,
            endereco: data?.endereco
              ? {
                  cep: data.endereco.cep || "",
                  estado: data.endereco.estado || "",
                  cidade: data.endereco.cidade || "",
                  bairro: data.endereco.bairro || "",
                  rua: data.endereco.rua || "",
                  numero: data.endereco.numero || "",
                  complemento: data.endereco.complemento || "",
                }
              : null,
          };

          // Se for consultor, adiciona os IDs dos clientes
          if (user === "consultor" && data.clientes) {
            formData.clientesId = data.clientes.map((c: any) => c.id);
          }

          reset(formData);
        }
      } catch (error: any) {
        setErrorSubmit(
          error?.response?.data?.message ?? "Erro ao buscar usuário"
        );
        console.error("Erro ao buscar usuário:", error);
      } finally {
        setLoadingFetch(false);
      }
    };

    getUsuario();
  }, [id, user, reset]);

  const onSubmit = async (data: any) => {
    setErrorSubmit(null);
    setLoading(true);
    try {
      const payload = {
        ...data,
        id: id, // Adiciona o ID para o upsert funcionar
      };

      await api.post(`/usuario`, payload);
      await router.push(`/dashboard/${user}`);
    } catch (error: any) {
      setErrorSubmit(
        error?.response?.data?.message ?? "Erro ao atualizar usuário"
      );
      console.error("Erro ao atualizar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  const onChangeSelectedClientes = (ids: string[]) => {
    setValue("clientesId", ids);
  };

  // Atualiza abas quando tipoUsuario muda
  useEffect(() => {
    if (!tipoUsuario) return;

    setTabsRender((prevTabs) => {
      const index = prevTabs.findIndex((tab) => tab.value === "clientes");

      if (tipoUsuario !== "CONSULTOR") {
        // Remove aba de clientes se não for consultor
        if (index !== -1) {
          const newTabs = [...prevTabs];
          newTabs.splice(index, 1);
          return newTabs;
        }
        return prevTabs;
      } else {
        // Adiciona aba de clientes se for consultor
        if (index === -1) {
          return [
            ...prevTabs,
            {
              label: "Adicionar clientes",
              value: "clientes",
              content: (
                <FormClientes
                  loading={loading}
                  onChangeSelected={onChangeSelectedClientes}
                />
              ),
            },
          ];
        }
        return prevTabs;
      }
    });
  }, [tipoUsuario, loading]);

  return (
    <HeaderForm form={methods} onSubmit={onSubmit} type="Editar">
      <div className="min-h-screen p-8 flex justify-center items-start">
        <div className="shadow-md rounded-2xl p-8 w-full max-w-3xl relative">
          {/* Loading Overlay */}
          {(loading || loadingFetch) && (
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
                <span className="text-white font-medium mt-2">
                  {loadingFetch ? "Carregando..." : "Salvando..."}
                </span>
              </div>
            </div>
          )}

          <h1 className="text-2xl mb-6">Editar usuário</h1>

          {errorSubmit && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
              {errorSubmit}
            </div>
          )}

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              name="tipoUsuario"
              orientation="vertical"
              label="Tipo do usuário"
              placeholder="Selecione o tipo do usuário"
              selectProps={{
                classNameContainer: "col-span-full",
                disabled: loading || loadingFetch,
              }}
            >
              <option value="CLIENTE">CLIENTE</option>
              <option value="CONSULTOR">CONSULTOR</option>
            </FormSelect>

            <FormInput
              name="nome"
              orientation="vertical"
              label="Nome"
              maskProps={{ mask: /^[A-Za-zÀ-ÿ\s]*$/ }}
              inputProps={{
                placeholder: "Digite o nome",
                disabled: loading || loadingFetch,
              }}
            />

            <FormInput
              name="telefone"
              label="Telefone"
              orientation="vertical"
              placeholder="(00) 00000-0000"
              inputProps={{
                placeholder: "Digite o telefone",
                disabled: loading || loadingFetch,
              }}
              maskProps={{
                mask: "00 00000-0000",
              }}
            />

            <FormInput
              name="email"
              label="E-mail"
              orientation="vertical"
              type="email"
              inputProps={{
                placeholder: "exemplo@email.com",
                classNameContainer: "col-span-full",
                disabled: loading || loadingFetch,
              }}
            />

            <Tabs
              defaultValue="basica"
              className="col-span-full mt-4"
              classNameContent="grid grid-cols-1 md:grid-cols-2 gap-6"
              tabs={tabsRender}
            />
          </section>
        </div>
      </div>
    </HeaderForm>
  );
}
