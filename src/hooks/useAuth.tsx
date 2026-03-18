// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";


// export function useAuth() {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context;
// }
import { useLoginMutation, useRegisterMutation } from "../api/services/AuthService/mutation";

export const useLogin = () => useLoginMutation();
export const useRegister = () => useRegisterMutation();