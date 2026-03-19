import { useGetProjects } from '#/hooks/useProject'
import { createFileRoute } from '@tanstack/react-router'
import { Ellipsis } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const Route = createFileRoute('/_authenticated/dashboard')({ component: Dashboard })

function RowMenu({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  const [pos, setPos] = useState<{ top: number; right: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!pos) return;
    function handleClose(e: MouseEvent) {
      const menu = document.getElementById('row-menu-dropdown');
      if (menu && !menu.contains(e.target as Node) && e.target !== btnRef.current) {
        setPos(null);
      }
    }
    document.addEventListener('mousedown', handleClose);
    return () => document.removeEventListener('mousedown', handleClose);
  }, [pos]);

  function handleToggle() {
    if (pos) { setPos(null); return; }
    const rect = btnRef.current!.getBoundingClientRect();
    setPos({ top: rect.bottom + window.scrollY + 4, right: window.innerWidth - rect.right });
  }

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleToggle}
        className="p-2 text-white rounded-lg hover:bg-neutral-700 transition-colors"
      >
        <Ellipsis className="h-4 w-4" />
      </button>
      {pos && (
        <div
          id="row-menu-dropdown"
          style={{ position: 'fixed', top: pos.top, right: pos.right, zIndex: 50 }}
          className="w-36 rounded-lg border border-neutral-700 bg-neutral-800 shadow-lg"
        >
          <button
            onClick={() => { onEdit(); setPos(null); }}
            className="w-full px-4 py-2 text-left text-sm text-white hover:bg-neutral-700 rounded-t-lg transition-colors"
          >
            Editar
          </button>
          <button
            onClick={() => { onDelete(); setPos(null); }}
            className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-neutral-700 rounded-b-lg transition-colors"
          >
            Excluir
          </button>
        </div>
      )}
    </>
  );
}

function Dashboard() {
  const { data, isLoading, error } = useGetProjects();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-3xl font-bold mb-4">Loading...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
      </div>
    )
  }

  const statusLabel: Record<string, string> = {
    pending: 'Pendente',
    in_progress: 'Em progresso',
    done: 'Concluído',
  }

  const statusColor: Record<string, string> = {
    pending: 'text-yellow-400',
    in_progress: 'text-blue-400',
    done: 'text-green-400',
  }

  return (
    <div className="flex flex-col h-full text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Projetos</h1>

      {data && data.length > 0 ? (
        <>
          <div className="flex justify-end mb-4">
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
              Adicionar
            </button>
          </div>
          <div className="overflow-x-auto rounded-lg border border-neutral-700">
            <table className="w-full text-sm text-left">
              <thead className="bg-neutral-800 text-neutral-400 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Nome</th>
                  <th className="px-4 py-3">Descrição</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Metas</th>
                  <th className="px-4 py-3">Responsável</th>
                  <th className="px-4 py-3">Criado em</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-700">
                {data.map((project) => (
                  <tr key={project.id} className="bg-neutral-900 hover:bg-neutral-800 transition-colors">
                    <td className="px-4 py-3 font-medium">{project.name}</td>
                    <td className="px-4 py-3 text-neutral-400">{project.description ?? '—'}</td>
                    <td className={`px-4 py-3 font-medium ${statusColor[project.status]}`}>
                      {statusLabel[project.status]}
                    </td>
                    <td className="px-4 py-3 text-neutral-400">{project.goals?.length ?? 0}</td>
                    <td className="px-4 py-3 text-neutral-400">
                      {project.user?.name ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-neutral-400">
                      {project.createdAt ? format(new Date(project.createdAt), "dd 'de' MMM 'de' yyyy", { locale: ptBR }) : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <RowMenu
                        onEdit={() => console.log('editar', project.id)}
                        onDelete={() => console.log('excluir', project.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-start gap-4">
          <p className="text-neutral-400">Nenhum projeto encontrado.</p>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            Adicionar
          </button>
        </div>
      )}
    </div>
  )
}
