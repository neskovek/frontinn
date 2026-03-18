import { useMutation } from "@tanstack/react-query";
import UserService from "../UserService/service";
import type { User } from "#/interfaces/user";

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: ({ id, user }: { id: string; user: User }) => UserService.put(id, user),
      onSuccess: (data) => { return data; },
      onError: (error) => { return error; }
  });
};

export const useDeleteUserMutation = () => {
  return useMutation({
    mutationFn: (id: string) => UserService.delete(id),
      onSuccess: (data) => { return data; },
      onError: (error) => { return error; }
  });
};