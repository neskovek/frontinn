import type { AuthLoginBody, AuthRegisterBody } from "#/interfaces/auth";
import request from "../../request";
import { AuthEndpoints } from "./config";

export default class AuthService {
  public static login = async (data: AuthLoginBody) => {
    const response = await request({
      url: AuthEndpoints.login(),
      method: "POST",
      data: data,
      headers: { "Content-Type": "application/json" }
    });

    if (!response.success) {
      throw new Error(response.error || 'Login failed');
    }

    return response;
  };

  public static register = async (data: AuthRegisterBody) => {
    const response = await request({
      url: AuthEndpoints.register(),
      method: "POST",
      data: data,
      headers: { "Content-Type": "application/json" }
    });

    if (!response.success) {
      throw new Error(response.error || 'Registration failed');
    }

    return response;
  }
}