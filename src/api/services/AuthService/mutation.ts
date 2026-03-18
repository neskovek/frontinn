import type { AuthLoginBody, AuthRegisterBody } from '#/interfaces/auth';
import { useMutation } from '@tanstack/react-query';
import AuthService from './service';


export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: AuthLoginBody) => AuthService.login(data),
    onSuccess: (data) => { return data; },
    onError: (error: Error) => { return error; },
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: AuthRegisterBody) => AuthService.register(data),
    onSuccess: (data) => { return data; },
    onError: (error: Error) => { return error; },
  });
};