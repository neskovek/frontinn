import { z } from 'zod';

export const formRegisterSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  character: z.string().min(1, 'Personagem obrigatório'),
});

export type FormRegisterSchema = z.infer<typeof formRegisterSchema>;
