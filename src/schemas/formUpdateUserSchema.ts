import { z } from 'zod';

export const formUpdateUserSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').optional(),
  email: z.string().email('E-mail inválido').optional(),
  character: z.string().min(1, 'Personagem obrigatório').optional(),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres').optional(),
});

export type FormUpdateUserSchema = z.infer<typeof formUpdateUserSchema>;
