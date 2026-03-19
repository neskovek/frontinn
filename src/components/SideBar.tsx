import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { BarChart2, Users, ChevronLeft, ChevronRight, User, LogOut, X } from 'lucide-react';
import { useAuth } from '#/hooks/useAuth';

const linkBase = 'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-neutral-400 hover:bg-neutral-800 hover:text-white';
const linkActive = 'bg-emerald-600/15 !text-emerald-400';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { user, role, signOut } = useAuth();

  const navigation = [
    { name: 'Projetos', href: '/', icon: BarChart2, adminOnly: false },
    { name: 'Usuários', href: '/users', icon: Users, adminOnly: true },
  ].filter(item => !item.adminOnly || role === 'admin');

  return (
    <>
      <aside
        className={`relative flex flex-col shrink-0 h-full bg-neutral-900 border-r border-neutral-800 transition-all duration-300 ${collapsed ? 'w-16' : 'w-56'}`}
      >
        <div className={`flex items-center h-14 px-4 border-b border-neutral-800 ${collapsed ? 'justify-center' : ''}`}>
          <span className="text-emerald-400 font-bold text-lg tracking-tight">
            {collapsed ? 'HF' : 'HeroForce'}
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {navigation.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              to={href}
              className={`${linkBase} ${collapsed ? 'justify-center' : ''}`}
              activeProps={{ className: linkActive }}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{name}</span>}
            </Link>
          ))}
        </nav>

        <div className="px-2 py-3 border-t border-neutral-800">
          <button
            onClick={() => setModalOpen(true)}
            className={`w-full ${linkBase} ${collapsed ? 'justify-center' : ''} bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 transition-colors`}
          >
            <User className="h-5 w-5 shrink-0" />
            {!collapsed && (
              <div className="flex flex-col items-start min-w-0 overflow-hidden w-full">
                <p>{user?.name}</p>
                <p className="text-xs text-neutral-500 truncate w-full">
                  {user?.email}
                </p>
                <p className="text-xs text-neutral-500">
                  {user?.character}
                </p>
              </div>
            )}
          </button>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </aside>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-neutral-900 border border-neutral-800 rounded-2xl w-80 p-6 flex flex-col gap-5 shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold text-base">Minha conta</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600/20 text-emerald-400 shrink-0">
                <User className="h-6 w-6" />
              </div>
              <div className="flex flex-col min-w-0">
                <p className="text-white font-medium truncate">{user?.name}</p>
                <p className="text-sm text-neutral-400 truncate">{user?.email}</p>
                {user?.character && (
                  <p className="text-xs text-neutral-500 truncate">{user.character}</p>
                )}
              </div>
            </div>

            <div className="border-t border-neutral-800" />

            <div className="flex flex-col gap-2 text-sm text-neutral-400">
              <div className="flex justify-between">
                <span>Função</span>
                <span className="capitalize text-neutral-200">{role ?? '—'}</span>
              </div>
            </div>

            <button
              onClick={signOut}
              className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-red-600/15 text-red-400 hover:bg-red-600/25 transition-colors text-sm font-medium"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        </div>
      )}
    </>
  );
}
