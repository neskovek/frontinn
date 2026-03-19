import { useForm, type UseFormRegister, type Control, type FieldValues, type DefaultValues, type Resolver } from "react-hook-form";
import { Search } from "lucide-react";
import type { ReactNode } from "react";

interface FormFilterProps<T extends FieldValues> {
    onSubmit: (data: T) => void;
    defaultValues?: DefaultValues<T>;
    resolver?: Resolver<T>;
    children: (register: UseFormRegister<T>, control: Control<T>) => ReactNode;
}

export default function FormFilter<T extends FieldValues>({
    onSubmit,
    defaultValues,
    resolver,
    children,
}: FormFilterProps<T>) {
    const { handleSubmit, register, control } = useForm<T>({ defaultValues, resolver });

    return (
        <div className="flex flex-col mb-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-2 bg-neutral-800 shadow-xl rounded-2xl p-3 border border-neutral-700"
            >
                {children(register, control)}
                <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 shrink-0"
                >
                    <Search size={16} />
                    Pesquisar
                </button>
            </form>
        </div>
    );
}
