import { useDeleteUserMutation, useUpdateUserMutation } from "#/api/services/UserService/mutation";
import { useGetUsersQuery, useOpenUserQuery } from "#/api/services/UserService/query";

export const useGetUsers = () => useGetUsersQuery();
export const useOpenUser = (id: string) => useOpenUserQuery(id);
export const useUpdateUser = () => useUpdateUserMutation();
export const useDeleteUser = () => useDeleteUserMutation();