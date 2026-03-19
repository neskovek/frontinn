import { z } from 'zod';

export const formCreateUserSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.email('E-mail inválido'),
  character: z.string().min(1, 'Personagem obrigatório'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export const formUpdateUserSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').optional(),
  email: z.email('E-mail inválido').optional(),
  character: z.string().min(1, 'Personagem obrigatório').optional()
});

export type FormCreateUserSchema = z.infer<typeof formCreateUserSchema>;
export type FormUpdateUserSchema = z.infer<typeof formUpdateUserSchema>;
