import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth, useLogin } from '#/hooks/useAuth';
import { formLoginSchema, type FormLoginSchema } from '#/schemas/formLoginSchema';
import type { AuthLoginResponse } from '#/interfaces/auth';

const TOKEN_KEY = '@frontinn:token'

export const Route = createFileRoute('/login')({
    beforeLoad: () => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem(TOKEN_KEY)
            if (token) {
                throw redirect({ to: '/dashboard' })
            }
        }
    },
    component: Login,
})

export default function Login() {
  const { signIn } = useAuth();
  const { mutateAsync } = useLogin();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormLoginSchema>({
    resolver: zodResolver(formLoginSchema)
  })

  const onSubmit = async (data: FormLoginSchema) => {
    try {
      const result = await mutateAsync(data);
      signIn(result as AuthLoginResponse);
      navigate({ to: '/dashboard' });
    } catch (error) {
      console.log(error);
      console.error('Erro ao realizar login, contate o suporte.', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-950 justify-center items-center px-4">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <p className="text-2xl font-bold text-white tracking-tight">HeroForce</p>
          <p className="text-neutral-400 text-sm mt-1">Entre na sua conta para continuar</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-neutral-300 font-medium">E-mail</label>
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-600 transition-colors"
              />
              {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-neutral-300 font-medium">Senha</label>
              <input
                {...register('password')}
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-600 transition-colors"
              />
              {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg mt-1 transition-colors text-sm"
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>

          </form>
        </div>

        <p className="text-center text-neutral-500 text-sm mt-6">
          Não possui conta?{' '}
          <a href="/register" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
            Cadastre-se
          </a>
        </p>

      </div>
    </div>
  )
}
