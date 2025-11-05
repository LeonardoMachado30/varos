import { z } from "zod";

export const pessoaSchema = z.object({
  id: z.string().optional(),
  cpf: z.string().optional(),
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.email("Email inválido").optional().nullable(),
  telefone: z.string().optional().nullable(),
  idade: z.number().or(z.string()).optional().nullable(),
  tipoUsuario: z.enum(["CLIENTE", "CONSULTOR"]),
  clientesId: z.array(z.string()).optional(),
  endereco: z
    .object({
      cep: z.string(),
      estado: z.string(),
      cidade: z.string().optional().nullable(),
      bairro: z.string().optional().nullable(),
      rua: z.string().optional().nullable(),
      endereco: z.string().optional().nullable(), // Campo alternativo para rua
      numero: z.string().optional().nullable(),
      complemento: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type PessoaInput = z.infer<typeof pessoaSchema>;
