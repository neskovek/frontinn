import type { Goals } from "./goals";
import type { User } from "./user";

export interface Project {
    id?: string;
    name: string;
    description?: string;
    status: 'pending' | 'in_progress' | 'done';
    goals?: Goals[];
    user?: User;
    createdAt?: string;
    updatedAt?: string;
}