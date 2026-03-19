import { useCreateProjectMutation, useDeleteProjectMutation, useUpdateProjectMutation } from "#/api/services/ProjectService/mutation";
import { useGetProjectsQuery, useOpenProjectQuery } from "#/api/services/ProjectService/query";

export const useGetProjects = (filters?: { userId?: string; status?: string }) => useGetProjectsQuery(filters);
export const useOpenProject = (id: string) => useOpenProjectQuery(id);
export const useCreateProject = () => useCreateProjectMutation();
export const useUpdateProject = () => useUpdateProjectMutation();
export const useDeleteProject = () => useDeleteProjectMutation();