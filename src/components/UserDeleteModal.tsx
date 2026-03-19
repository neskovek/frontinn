import { useDeleteUserMutation } from '#/api/services/UserService/mutation';
import { useQueryClient } from '@tanstack/react-query';
import type { User } from '#/interfaces/user';
import { X } from 'lucide-react';

interface UserDeleteModalProps {
    user?: User;
    onClose: () => void;
    onSuccess: () => void;
}

export function UserDeleteModal({ user, onClose, onSuccess }: UserDeleteModalProps) {
    const queryClient = useQueryClient();
    const { mutate: deleteUser, isPending } = useDeleteUserMutation();

    function handleDelete() {
        if (!user?.id) return;
        deleteUser(user.id, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['users'] });
                onSuccess();
                onClose();
            },
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
            <div
                className="bg-neutral-900 border border-neutral-700 rounded-xl w-full max-w-lg p-6 flex flex-col gap-5"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-red-400 text-xl font-semibold">Excluir usuário</h2>
                    <button onClick={onClose} className="text-neutral-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <p className="text-neutral-400">
                    Tem certeza que deseja excluir o usuário <span className="text-white">{user?.name}</span>?
                    <br />
                    Esta ação não pode ser desfeita.
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isPending}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                        {isPending ? 'Excluindo...' : 'Excluir'}
                    </button>
                </div>
            </div>
        </div>
    );
}
