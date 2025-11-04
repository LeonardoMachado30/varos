import { z } from "zod";
import { pessoaSchema } from "./pessoa.schema";
import { clienteSchema } from "./cliente.schema";

export const consultorSchema = z.object({
  id: z.uuid().optional(),
  pessoa: pessoaSchema,
  clientesId: z.array(z.uuid()).optional(),
});

export type ConsultorInput = z.infer<typeof consultorSchema>;
