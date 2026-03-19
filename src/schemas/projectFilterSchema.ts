import { z } from 'zod';

export const projectFilterSchema = z.object({
    userId: z.string().optional(),
    status: z.enum(['', 'pending', 'in_progress', 'done']).optional(),
});

export type ProjectFilterSchema = z.infer<typeof projectFilterSchema>;
