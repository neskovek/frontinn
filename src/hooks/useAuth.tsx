import { AuthContext } from "#/contexts/AuthContext";
import { useContext } from "react";
import { useLoginMutation, useRegisterMutation } from "../api/services/AuthService/mutation";

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const useLogin = () => useLoginMutation();
export const useRegister = () => useRegisterMutation();