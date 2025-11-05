"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import HeaderDefault from "@/components/molecules/HeaderDefault";
import { FormInput } from "@/components/atomic/input/FormInput";
import { PrimaryButton } from "@/components/atomic/button/PrimaryButton";
import Image from "next/image";
import api from "@/axios";
import { useRouter } from "next/navigation";

type LoginFormInputs = {
  email: string;
  cpf: string;
};

export default function LoginPage() {
  const methods = useForm<LoginFormInputs>({
    defaultValues: { email: "", cpf: "" },
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    control,
  } = methods;
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    setErrorMsg(null);
    clearErrors();

    if (!data.email || !data.cpf) {
      setError("email", {
        type: "manual",
        message: "Preencha todos os campos.",
      });
      setError("cpf", {
        type: "manual",
        message: "Preencha todos os campos.",
      });
      setErrorMsg("Preencha todos os campos.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/consultor/login", data, {
        withCredentials: true,
      });

      if (response.data.status === 200) {
        const { token } = response.data;

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        localStorage.setItem("token", token);

        await router.push("/dashboard/consultor");
      } else {
        setErrorMsg("Falha ao fazer login. Verifique suas credenciais.");
      }
    } catch (err: any) {
      setErrorMsg(
        err?.response?.data?.message
          ? String(err.response.data.message)
          : "Erro ao fazer login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#131313] font-sans">
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-[#131516] border-2 border-[#222729] shadow-md rounded-2xl min-w-[340px] w-full max-w-sm py-10 px-8 flex flex-col items-center justify-center">
          <Image src="/logo.svg" width={200} height={40} alt="logo" />

          <h1 className="text-white text-md font-bold my-10 tracking-tight">
            Acesse sua conta
          </h1>

          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-5"
              autoComplete="off"
              noValidate
            >
              <FormInput
                name="email"
                label="E-mail"
                orientation="vertical"
                placeholder="Digite seu e-mail"
                control={control}
                type="email"
                inputProps={{
                  id: "email",
                  autoComplete: "username",
                  disabled: loading,
                }}
              />
              <FormInput
                name="cpf"
                label="CPF"
                orientation="vertical"
                placeholder="Digite sua senha"
                control={control}
                type="password"
                inputProps={{
                  id: "cpf",
                  autoComplete: "current-password",
                  disabled: loading,
                }}
              />
              {(errorMsg || errors.email || errors.cpf) && (
                <div className="text-red-500 text-sm font-medium px-1">
                  {errorMsg ||
                    errors.email?.message?.toString() ||
                    errors.cpf?.message?.toString()}
                </div>
              )}
              <PrimaryButton
                type="submit"
                color="secondary"
                size="lg"
                loading={loading}
                className="mt-2 w-full rounded-full font-semibold"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </PrimaryButton>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
