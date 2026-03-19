import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import {
    formCreateUserSchema,
    formUpdateUserSchema,
    type FormCreateUserSchema,
    type FormUpdateUserSchema,
} from '#/schemas/formUpdateUserSchema';
import { useUpdateUser } from '#/hooks/useUser';
import { useRegisterMutation } from '#/api/services/AuthService/mutation';
import type { User } from '#/interfaces/user';

interface UserFormModalProps {
    user?: User;
    onClose: () => void;
    onSuccess: () => void;
}

export function UserFormModal({ user, onClose, onSuccess }: UserFormModalProps) {
    const isEdit = !!user;
    const updateUser = useUpdateUser();
    const createUser = useRegisterMutation();

    const createForm = useForm<FormCreateUserSchema>({
        resolver: zodResolver(formCreateUserSchema),
        defaultValues: { name: '', email: '', password: '', character: '' },
    });

    const editForm = useForm<FormUpdateUserSchema>({
        resolver: zodResolver(formUpdateUserSchema),
        defaultValues: { name: '', email: '', character: '' },
    });

    useEffect(() => {
        if (user) {
            editForm.reset({
                name: user.name,
                email: user.email,
                character: user.character,
            });
        }
    }, [user]);

    const onSubmitEdit = async (data: FormUpdateUserSchema) => {
        await updateUser.mutateAsync({ id: user?.id ?? '', user: data as User });
        onSuccess();
        onClose();
    };

    const onSubmitCreate = async (data: FormCreateUserSchema) => {
        await createUser.mutateAsync(data);
        onSuccess();
        onClose();
    };

    const isPending = editForm.formState.isSubmitting || createForm.formState.isSubmitting || updateUser.isPending || createUser.isPending;

    const inputClass = 'bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
            <div
                className="bg-neutral-900 border border-neutral-700 rounded-xl w-full max-w-lg p-6 flex flex-col gap-5"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-white text-xl font-semibold">
                        {isEdit ? 'Editar usuário' : 'Novo usuário'}
                    </h2>
                    <button onClick={onClose} className="text-neutral-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {isEdit ? (
                    <form onSubmit={editForm.handleSubmit(onSubmitEdit)} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-neutral-300">Nome</label>
                            <input {...editForm.register('name')} placeholder="Nome completo" className={inputClass} />
                            {editForm.formState.errors.name && <span className="text-xs text-red-400">{editForm.formState.errors.name.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-neutral-300">E-mail</label>
                            <input {...editForm.register('email')} type="email" placeholder="email@exemplo.com" className={inputClass} />
                            {editForm.formState.errors.email && <span className="text-xs text-red-400">{editForm.formState.errors.email.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-neutral-300">Personagem</label>
                            <input {...editForm.register('character')} placeholder="Personagem do usuário" className={inputClass} />
                            {editForm.formState.errors.character && <span className="text-xs text-red-400">{editForm.formState.errors.character.message}</span>}
                        </div>

                        {updateUser.isError && <p className="text-xs text-red-400">Ocorreu um erro. Tente novamente.</p>}

                        <div className="flex justify-end gap-3 pt-2">
                            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-neutral-300 hover:text-white transition-colors">
                                Cancelar
                            </button>
                            <button type="submit" disabled={isPending} className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                {isPending ? 'Salvando...' : 'Salvar alterações'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={createForm.handleSubmit(onSubmitCreate)} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-neutral-300">Nome</label>
                            <input {...createForm.register('name')} placeholder="Nome completo" className={inputClass} />
                            {createForm.formState.errors.name && <span className="text-xs text-red-400">{createForm.formState.errors.name.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-neutral-300">E-mail</label>
                            <input {...createForm.register('email')} type="email" placeholder="email@exemplo.com" className={inputClass} />
                            {createForm.formState.errors.email && <span className="text-xs text-red-400">{createForm.formState.errors.email.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-neutral-300">Personagem</label>
                            <input {...createForm.register('character')} placeholder="Personagem do usuário" className={inputClass} />
                            {createForm.formState.errors.character && <span className="text-xs text-red-400">{createForm.formState.errors.character.message}</span>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-neutral-300">Senha</label>
                            <input {...createForm.register('password')} type="password" placeholder="Mínimo 6 caracteres" className={inputClass} />
                            {createForm.formState.errors.password && <span className="text-xs text-red-400">{createForm.formState.errors.password.message}</span>}
                        </div>

                        {createUser.isError && <p className="text-xs text-red-400">Ocorreu um erro. Tente novamente.</p>}

                        <div className="flex justify-end gap-3 pt-2">
                            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-neutral-300 hover:text-white transition-colors">
                                Cancelar
                            </button>
                            <button type="submit" disabled={isPending} className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                {isPending ? 'Salvando...' : 'Criar usuário'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
