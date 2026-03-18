import { useQuery } from "@tanstack/react-query";
import ProjectService from "./service";
import type { Project } from "#/interfaces/project";

export const useGetProjectsQuery = (searchText?: string) => {
    return useQuery<Project[], Error>({
        queryKey: ['getProjects', searchText],
        queryFn: () => ProjectService.get(searchText)
    });
};

export const useOpenProjectQuery = (id: string) => {
    return useQuery<Project, Error>({
        queryKey: ['openProject', id],
        queryFn: () => ProjectService.openById(id)
    });
};