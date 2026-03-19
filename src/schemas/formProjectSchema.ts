import { z } from 'zod';

const goalSchema = z.object({
  description: z.string().min(1, 'Descrição obrigatória').optional(),
  isCompleted: z.boolean().optional(),
});

export const formCreateProjectSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  description: z.string().optional(),
  status: z.enum(['pending', 'in_progress', 'done']),
  goals: z.array(goalSchema).optional(),
});

export const formUpdateProjectSchema = formCreateProjectSchema.partial();

export type FormCreateProjectSchema = z.infer<typeof formCreateProjectSchema>;
export type FormUpdateProjectSchema = z.infer<typeof formUpdateProjectSchema>;
