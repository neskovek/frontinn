import { useQuery } from "@tanstack/react-query";
import UserService from "./service";
import type { User } from "#/interfaces/user";

export const useOpenUserQuery = (id: string) => {
    return useQuery<User, Error>({
        queryKey: ['openUser', id],
        queryFn: () => UserService.openById(id)
    });
};