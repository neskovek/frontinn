import { useMutation } from "@tanstack/react-query";
import ProjectService from "./service";
import type { Project } from "#/interfaces/project";

export const useCreateProjectMutation = () => {
  return useMutation({
  mutationFn: (project: Project) => ProjectService.post(project),
    onSuccess: (data) => { return data; },
    onError: (error) => { return error; }
  });
};

export const useUpdateProjectMutation = () => {
  return useMutation({
    mutationFn: ({ id, project }: { id: string; project: Project }) => ProjectService.put(id, project),
      onSuccess: (data) => { return data; },
      onError: (error) => { return error; }
  });
};

export const useDeleteProjectMutation = () => {
  return useMutation({
    mutationFn: (id: string) => ProjectService.delete(id),
      onSuccess: (data) => { return data; },
      onError: (error) => { return error; }
  });
};