import { useDeleteUserMutation, useUpdateUserMutation } from "#/api/services/UserService/mutation";
import { useOpenUserQuery } from "#/api/services/UserService/query";

export const useOpenUser = (id: string) => useOpenUserQuery(id);
export const useUpdateUser = () => useUpdateUserMutation();
export const useDeleteUser = () => useDeleteUserMutation();