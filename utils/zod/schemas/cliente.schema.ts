import { z } from "zod";
import { pessoaSchema } from "./pessoa.schema";

export const clienteSchema = z.object({
  id: z.uuid().optional(),
  pessoaId: z.uuid().optional(),
  consultorId: z.uuid().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type ClienteInput = z.infer<typeof clienteSchema>;

export const clienteWithRelationsSchema = clienteSchema.extend({
  pessoa: pessoaSchema,
});

export type ClienteWithRelationsInput = z.infer<
  typeof clienteWithRelationsSchema
>;
