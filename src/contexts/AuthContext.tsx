import { createContext, useState, useEffect, useCallback } from 'react';
import type { User } from '#/interfaces/user';
import type { AuthLoginResponse } from '#/interfaces/auth';
import { decodeToken } from '#/lib/token';
import api from '#/api/axios';

const TOKEN_KEY = '@frontinn:token';
const USER_KEY = '@frontinn:user';

interface AuthContextData {
  user: User | null;
  token: string | null;
  role: 'admin' | 'hero' | null;
  isAuthenticated: boolean;
  signIn: (response: AuthLoginResponse) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);
    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser) as User);
  }, []);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const signIn = useCallback((response: AuthLoginResponse) => {
    const { access_token, user } = response;
    localStorage.setItem(TOKEN_KEY, access_token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setToken(access_token);
    setUser(user);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const role = token ? (decodeToken(token)?.role ?? null) : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        isAuthenticated: !!token,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
