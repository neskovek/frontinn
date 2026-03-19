import { Ellipsis } from 'lucide-react';
import { useRef, useState, useEffect, useId } from 'react';

export type DropdownMenuItem = {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'danger';
  icon?: React.ReactNode;
};

type DropdownMenuProps = {
  items: DropdownMenuItem[];
  trigger?: React.ReactNode;
};

export function DropdownMenu({ items, trigger }: DropdownMenuProps) {
  const [pos, setPos] = useState<{ top: number; right: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!pos) return;
    function handleClose(e: MouseEvent) {
      const menu = document.getElementById(menuId);
      if (menu && !menu.contains(e.target as Node) && e.target !== btnRef.current) {
        setPos(null);
      }
    }
    document.addEventListener('mousedown', handleClose);
    return () => document.removeEventListener('mousedown', handleClose);
  }, [pos, menuId]);

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
        {trigger ?? <Ellipsis className="h-4 w-4" />}
      </button>
      {pos && (
        <div
          id={menuId}
          style={{ position: 'fixed', top: pos.top, right: pos.right, zIndex: 50 }}
          className="min-w-36 rounded-lg border border-neutral-700 bg-neutral-800 shadow-lg overflow-hidden"
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => { item.onClick(); setPos(null); }}
              className={[
                'w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors hover:bg-neutral-700',
                item.variant === 'danger' ? 'text-red-400' : 'text-white',
              ].join(' ')}
            >
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
