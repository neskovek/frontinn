import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface SearchSelectProps<T extends { id: string }> {
    items: T[];
    labelKey: keyof T;
    value?: string;
    onChange: (id: string) => void;
    placeholder?: string;
}

export function SearchSelect<T extends { id: string }>({
    items,
    labelKey,
    value,
    onChange,
    placeholder = 'Buscar...',
}: SearchSelectProps<T>) {
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selected = items.find((item) => item.id === value);

    const filtered = items.filter((item) =>
        String(item[labelKey]).toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
                setQuery('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (item: T) => {
        onChange(item.id);
        setOpen(false);
        setQuery('');
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange('');
    };

    return (
        <div ref={containerRef} className="relative w-full">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="w-full flex items-center justify-between bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-left focus:outline-none focus:border-emerald-500 transition-colors"
            >
                <span className={selected ? 'text-white' : 'text-neutral-500'}>
                    {selected ? String(selected[labelKey]) : placeholder}
                </span>
                <span className="flex items-center gap-1 text-neutral-400">
                    {selected && (
                        <span onClick={handleClear} className="hover:text-white transition-colors">
                            <X size={14} />
                        </span>
                    )}
                    <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
                </span>
            </button>

            {open && (
                <div className="absolute z-50 mt-1 w-full bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg overflow-hidden">
                    <ul className="max-h-48 overflow-y-auto">
                        {filtered.length > 0 ? (
                            filtered.map((item) => (
                                <li
                                    key={item.id}
                                    onClick={() => handleSelect(item)}
                                    className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                                        item.id === value
                                            ? 'bg-emerald-600 text-white'
                                            : 'text-neutral-300 hover:bg-neutral-700'
                                    }`}
                                >
                                    {String(item[labelKey])}
                                </li>
                            ))
                        ) : (
                            <li className="px-3 py-2 text-sm text-neutral-500">Nenhum resultado</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
