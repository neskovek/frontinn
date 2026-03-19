import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRegister } from '#/hooks/useAuth';
import { formRegisterSchema, type FormRegisterSchema } from '#/schemas/formRegisterSchema';

const TOKEN_KEY = '@frontinn:token'

export const Route = createFileRoute('/register')({
    beforeLoad: () => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem(TOKEN_KEY)
            if (token) {
                throw redirect({ to: '/dashboard' })
            }
        }
    },
    component: Register,
})

export default function Register() {
  const { mutateAsync } = useRegister();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormRegisterSchema>({
    resolver: zodResolver(formRegisterSchema)
  })

  const onSubmit = async (data: FormRegisterSchema) => {
    try {
      const result = await mutateAsync(data);

      if (result) {
        navigate({ to: '/login' });
        return;
      }

    } catch (error) {
      console.error('Erro ao realizar o cadastro, contate o suporte.', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-950 justify-center items-center px-4">
      <div className="w-full max-w-sm">

        <div className="text-center mb-8">
          <p className="text-2xl font-bold text-white tracking-tight">HeroForce</p>
          <p className="text-neutral-400 text-sm mt-1">Crie sua conta para começar</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-neutral-300 font-medium">Nome</label>
              <input
                {...register('name')}
                type="text"
                autoComplete="name"
                placeholder="Seu nome"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-600 transition-colors"
              />
              {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
            </div>

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
                autoComplete="new-password"
                placeholder="••••••••"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-600 transition-colors"
              />
              {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-neutral-300 font-medium">Personagem</label>
              <input
                {...register('character')}
                type="text"
                placeholder="Seu personagem"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-600 transition-colors"
              />
              {errors.character && <p className="text-red-400 text-xs">{errors.character.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg mt-1 transition-colors text-sm"
            >
              {isSubmitting ? 'Criando conta...' : 'Criar conta'}
            </button>

          </form>
        </div>

        <p className="text-center text-neutral-500 text-sm mt-6">
          Já tem uma conta?{' '}
          <a href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
            Entrar
          </a>
        </p>

      </div>
    </div>
  )
}
