import { FormInput } from "@/components/atomic/input/FormInput";
import { FormSelect } from "@/components/atomic/input/FormSelect";
import { PrimaryButton } from "@/components/atomic/button/PrimaryButton";
import Table from "@/components/organims/Table";
import { useForm, FormProvider } from "react-hook-form";

export default function DashboardPage() {
  const methods = useForm({
    defaultValues: {
      nome: "",
      status: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    console.log("Filtros aplicados:", data);
    // chamada API futura
  };

  return (
    <div className="min-h-screen p-6 bg-[var(--bg-light)]">
      <div className="max-w-7xl mx-auto bg-[var(--bg-card)] rounded-2xl shadow p-6">
        <h1 className="text-2xl font-semibold mb-6 text-[var(--secondary)]">
          Dashboard de Clientes
        </h1>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          >
            <FormInput
              name="nome"
              label="Nome do Cliente"
              placeholder="Pesquisar por nome..."
              inputProps={{
                classNameContainer: "col-span-2",
              }}
            />

            <FormSelect name="status" label="Status" placeholder="Selecione...">
              <option value="">Todos</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </FormSelect>

            <div className="flex items-end">
              <PrimaryButton type="submit" className="w-full">
                Aplicar filtros
              </PrimaryButton>
            </div>
          </form>
        </FormProvider>

        {/* Tabela principal */}
        <div className="rounded-lg border border-[var(--border-color)] bg-white p-4">
          <Table />
        </div>
      </div>
    </div>
  );
}
