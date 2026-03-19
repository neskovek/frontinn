import type { User } from "#/interfaces/user";
import request from "../../request";
import { UserEndpoints } from "./config";

export default class UserService {
    public static get = async (searchText?: string) => {
        const params = new URLSearchParams();
        if (searchText && searchText.trim() !== '') {
            params.append('search', searchText.trim());
        }
    
        try {
            const response = await request({
                url: `${UserEndpoints.list()}?${params.toString()}`,
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            return response.result;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    };

    public static openById = async (id: string) => {
        try {
            const response = await request({
                url: UserEndpoints.openById(id),
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            return response?.data || { data: {}, success: true };
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    };

    public static put = async (id: string, data: User) => {
        return await request({
            url: UserEndpoints.update(id),
            method: "PUT",
            data: data,
            headers: { "Content-Type": "application/json" }
        });
    };

    public static delete = async (id: string) => {
        return await request({
            url: UserEndpoints.delete(id),
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
    };
}