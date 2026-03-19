import { z } from 'zod';

export const formLoginSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(1, 'Senha obrigatória'),
});

export type FormLoginSchema = z.infer<typeof formLoginSchema>;
