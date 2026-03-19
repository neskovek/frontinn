import { useQuery } from "@tanstack/react-query";
import UserService from "./service";
import type { User } from "#/interfaces/user";

export const useGetUsersQuery = () => {
    return useQuery<User[], Error>({
        queryKey: ['users'],
        queryFn: () => UserService.get()
    });
};

export const useOpenUserQuery = (id: string) => {
    return useQuery<User, Error>({
        queryKey: ['openUser', id],
        queryFn: () => UserService.openById(id)
    });
};