import type { Project } from "./project";

export interface User {
    id?: string;
    name: string;
    email: string;
    character: string;
    role: 'admin' | 'hero';
    projects?: Project[];
    createdAt?: string;
    updatedAt?: string;
}