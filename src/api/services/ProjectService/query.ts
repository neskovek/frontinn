import { useQuery } from "@tanstack/react-query";
import ProjectService from "./service";
import type { Project } from "#/interfaces/project";

export const useGetProjectsQuery = (filters?: { userId?: string; status?: string }) => {
    return useQuery<Project[], Error>({
        queryKey: ['getProjects', filters],
        queryFn: () => ProjectService.get(filters)
    });
};

export const useOpenProjectQuery = (id: string) => {
    return useQuery<Project, Error>({
        queryKey: ['openProject', id],
        queryFn: () => ProjectService.openById(id)
    });
};