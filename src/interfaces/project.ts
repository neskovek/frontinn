import type { Goals } from "./goals";

export interface Project {
    id?: string;
    name: string;
    description?: string;
    status: 'pending' | 'in_progress' | 'done';
    goals?: Goals[];
    createdAt?: string;
    updatedAt?: string;
}