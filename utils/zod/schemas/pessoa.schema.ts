import { isValidCPF } from "@/utils/validateCpf";
import { z } from "zod";

export const pessoaSchema = z.object({
  id: z.string().optional(),
  cpf: z
    .string("CPF é obrigatório")
    .min(1, "CPF é obrigatório")
    .refine(
      (val) => {
        const unmaskedCpf = val.replace(/\D/g, "");
        return isValidCPF(unmaskedCpf);
      },
      {
        message: "CPF inválido",
      }
    ),
  nome: z.string("Nome é obrigatória").min(1, "Nome é obrigatório"),
  email: z.email("Email inválido"),
  telefone: z.string().optional().nullable(),
  idade: z.number().or(z.string()),
  tipoUsuario: z.enum(["CLIENTE", "CONSULTOR"]),
  clientesId: z.array(z.string()).optional(),
  endereco: z
    .object({
      cep: z.string(),
      estado: z.string(),
      cidade: z.string().optional().nullable(),
      bairro: z.string().optional().nullable(),
      rua: z.string().optional().nullable(),
      endereco: z.string().optional().nullable(),
      numero: z.string().optional().nullable(),
      complemento: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type PessoaInput = z.infer<typeof pessoaSchema>;
