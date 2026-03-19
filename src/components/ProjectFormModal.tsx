import { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Plus, Trash2 } from 'lucide-react';
import { formCreateProjectSchema, type FormCreateProjectSchema } from '#/schemas/formProjectSchema';
import { useCreateProject, useUpdateProject } from '#/hooks/useProject';
import { useGetUsers } from '#/hooks/useUser';
import { SearchSelect } from '#/components/SearchSelect';
import type { Project } from '#/interfaces/project';

interface ProjectFormModalProps {
    project?: Project;
    onClose: () => void;
    onSuccess: () => void;
}

export function ProjectFormModal({ project, onClose, onSuccess }: ProjectFormModalProps) {
    const isEdit = !!project;
    const createProject = useCreateProject();
    const updateProject = useUpdateProject();
    const { data: users } = useGetUsers();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormCreateProjectSchema>({
        resolver: zodResolver(formCreateProjectSchema),
        defaultValues: {
            name: '',
            description: '',
            status: 'pending',
            goals: [],
            userId: '',
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: 'goals' });

    useEffect(() => {
        if (project) {
            reset({
                name: project.name,
                description: project.description ?? '',
                status: project.status,
                goals: project.goals?.map((g) => ({
                    description: g.description ?? '',
                    isCompleted: g.isCompleted ?? false,
                })) ?? [],
                userId: project.user?.id ?? '',
            });
        }
    }, [project, reset]);

    const onSubmit = async (data: FormCreateProjectSchema) => {
        if (isEdit && project?.id) {
            await updateProject.mutateAsync({ id: project.id, project: data as Project });
        } else {
            await createProject.mutateAsync(data as Project);
        }
        onSuccess();
        onClose();
    };

    const isPending = isSubmitting || createProject.isPending || updateProject.isPending;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
            <div
                className="bg-neutral-900 border border-neutral-700 rounded-xl w-full max-w-lg p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-white text-xl font-semibold">
                        {isEdit ? 'Editar projeto' : 'Novo projeto'}
                    </h2>
                    <button onClick={onClose} className="text-neutral-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-neutral-300">Nome</label>
                        <input
                            {...register('name')}
                            placeholder="Nome do projeto"
                            className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                        {errors.name && <span className="text-xs text-red-400">{errors.name.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-neutral-300">Descrição</label>
                        <textarea
                            {...register('description')}
                            placeholder="Descrição opcional"
                            rows={3}
                            className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-neutral-300">Usuário responsável</label>
                        <Controller
                            control={control}
                            name="userId"
                            render={({ field }) => (
                                <SearchSelect
                                    items={(users ?? []).filter((u): u is typeof u & { id: string } => !!u.id)}
                                    labelKey="name"
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Selecione um usuário"
                                />
                            )}
                        />
                        {errors.userId && <span className="text-xs text-red-400">{errors.userId.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-neutral-300">Status</label>
                        <select
                            {...register('status')}
                            className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                        >
                            <option value="pending">Pendente</option>
                            <option value="in_progress">Em progresso</option>
                            <option value="done">Concluído</option>
                        </select>
                        {errors.status && <span className="text-xs text-red-400">{errors.status.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm text-neutral-300">Metas</label>
                            <button
                                type="button"
                                onClick={() => append({ description: '', isCompleted: false })}
                                className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                            >
                                <Plus size={14} /> Adicionar meta
                            </button>
                        </div>
                        {fields.length === 0 && (
                            <p className="text-xs text-neutral-500">Nenhuma meta adicionada.</p>
                        )}
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex items-center gap-2">
                                <input
                                    {...register(`goals.${index}.description`)}
                                    placeholder={`Meta ${index + 1}`}
                                    className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
                                />
                                <input
                                    type="checkbox"
                                    {...register(`goals.${index}.isCompleted`)}
                                    className="accent-emerald-500 w-4 h-4 cursor-pointer"
                                    title="Concluída"
                                />
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-neutral-500 hover:text-red-400 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {(createProject.isError || updateProject.isError) && (
                        <p className="text-xs text-red-400">Ocorreu um erro. Tente novamente.</p>
                    )}

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-neutral-300 hover:text-white transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isPending ? 'Salvando...' : isEdit ? 'Salvar alterações' : 'Criar projeto'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
