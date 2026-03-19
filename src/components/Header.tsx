import { Bell } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between h-14 px-6 bg-neutral-900 border-b border-neutral-800 shrink-0">
      <span className="text-neutral-500 text-sm">Bem-vindo de volta</span>

      <div className="flex items-center gap-3">
        <button className="flex items-center justify-center w-8 h-8 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors">
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
