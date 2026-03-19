import type { Project } from "#/interfaces/project";
import request from "../../request";
import { ProjectEndpoints } from "./config";

export default class ProjectService {
    public static get = async (filters?: { userId?: string; status?: string }) => {
        const params = new URLSearchParams();
        if (filters?.userId) params.append('userId', filters.userId);
        if (filters?.status) params.append('status', filters.status);
    
        try {
            const response = await request({
                url: `${ProjectEndpoints.list()}?${params.toString()}`,
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            return response.result;
        } catch (error) {
            console.error("Error fetching projects:", error);
            throw error;
        }
    };

    public static openById = async (id: string) => {
        try {
            const response = await request({
                url: ProjectEndpoints.openById(id),
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            return response;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    };

    public static post = async (data: Project) => {
        return await request({
            url: ProjectEndpoints.create(),
            method: "POST",
            data: data,
            headers: { "Content-Type": "application/json" }
        });
    };

    public static put = async (id: string, data: Project) => {
        return await request({
            url: ProjectEndpoints.update(id),
            method: "PUT",
            data: data,
            headers: { "Content-Type": "application/json" }
        });
    };

    public static delete = async (id: string) => {
        return await request({
            url: ProjectEndpoints.delete(id),
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
    };
}