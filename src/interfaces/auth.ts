import type { User } from "./user";

export interface AuthLoginBody {
    email: string;
    password: string;
}

export interface AuthRegisterBody {
    name: string;
    email: string;
    password: string;
    character: string;
}

export interface AuthLoginResponse {
    acess_token: string;
    user: User;
}

export interface AuthRegisterResponse {
    message: string;
}