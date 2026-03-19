import { Link } from '@tanstack/react-router';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
      <span className="text-8xl font-bold text-emerald-400">404</span>
      <h1 className="text-2xl font-semibold text-white">Página não encontrada</h1>
      <p className="text-neutral-400 text-sm max-w-xs">
        Essa página não existe ou você não tem permissão para acessá-la.
      </p>
      <Link
        to="/"
        className="mt-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
