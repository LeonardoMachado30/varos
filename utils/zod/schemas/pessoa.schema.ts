import { z } from "zod";

export const pessoaSchema = z.object({
  id: z.uuid().optional(),
  tipoUsuario: z.enum(["CONSULTOR", "CLIENTE"], {
    error: "Selecione o consultor",
  }),
  nome: z.string("Nome é obrigatório").min(1, "Nome é obrigatório"),
  cpf: z.string("CPF é obrigatório").min(1, "CPF é obrigatório"),
  telefone: z.string("Telefone é obrigatório"),
  email: z.email().optional(),
  idade: z.number().int().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),

  endereco: z.any().optional(),
});

export type PessoaInput = z.infer<typeof pessoaSchema>;
