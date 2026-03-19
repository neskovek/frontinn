import { useState } from 'react';
import { useGetProjects } from '#/hooks/useProject';
import { useGetUsers } from '#/hooks/useUser';
import { createFileRoute } from '@tanstack/react-router';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { zodResolver } from '@hookform/resolvers/zod';
import { DropdownMenu } from '#/components/DropdownMenu';
import { ProjectFormModal } from '#/components/ProjectFormModal';
import type { Project } from '#/interfaces/project';
import { ProjectDeleteModal } from '#/components/ProjectDeleteModal';
import { useAuth } from '#/hooks/useAuth';
import FormFilter from '#/components/FormFilter';
import { projectFilterSchema, type ProjectFilterSchema } from '#/schemas/projectFilterSchema';

export const Route = createFileRoute('/_authenticated/dashboard')({ component: DashboardComponent });

function DashboardComponent() {
	const { role } = useAuth();
	const [filters, setFilters] = useState<ProjectFilterSchema>({});
	const { data, isLoading, error, refetch } = useGetProjects(filters);

	const handleFilter = (data: ProjectFilterSchema) => {
		setFilters({
			userId: data.userId || undefined,
			status: data.status || undefined,
		});
	};
	const { data: users } = useGetUsers();
	const isAdmin = role === 'admin';
	const [modalFormOpen, setModalFormOpen] = useState(false);
	const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
	const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);

	const openCreate = () => {
		setSelectedProject(undefined);
		setModalFormOpen(true);
	};

	const openEdit = (project: Project) => {
		setSelectedProject(project);
		setModalFormOpen(true);
	};

	const closeFormModal = () => {
		setModalFormOpen(false);
		setSelectedProject(undefined);
	};

	const openDelete = (project: Project) => {
		setSelectedProject(project);
		setModalDeleteOpen(true);
	};

	const closeDeleteModal = () => {
		setModalDeleteOpen(false);
		setSelectedProject(undefined);
	};

	function formatStatus(status: string) {
		const statusMap: Record<string, string> = {
			pending: 'Pendente',
			in_progress: 'Em progresso',
			done: 'Concluído',
		};
		return statusMap[status] || status;
	}

	function getStatusColor(status: string) {
		const statusColorMap: Record<string, string> = {
			pending: 'bg-yellow-400',
			in_progress: 'bg-blue-400',
			done: 'bg-green-400',
		};
		return statusColorMap[status] || 'bg-gray-400';
	}

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center h-full text-white">
				<h1 className="text-3xl font-bold mb-4">Loading...</h1>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center h-full text-white">
				<h1 className="text-3xl font-bold mb-4">Error</h1>
			</div>
		);
	}

	return (
		<div className="flex flex-col h-full text-white p-6">
			<h1 className="text-3xl font-bold mb-6">Projetos</h1>

			{isAdmin && (
				<div className="flex justify-end mb-4">
					<button
						onClick={openCreate}
						className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
					>
						Adicionar
					</button>
				</div>
			)}

			<FormFilter<ProjectFilterSchema>
				onSubmit={handleFilter}
				defaultValues={{}}
				resolver={zodResolver(projectFilterSchema)}
			>
				{(register) => (
					<>
						<select
							{...register('userId')}
							className="p-2 rounded-md bg-neutral-700 text-white flex-1"
						>
							<option value="">Todos os usuários</option>
							{users?.map((user) => (
								<option key={user.id} value={user.id}>
									{user.name}
								</option>
							))}
						</select>
						<select
							{...register('status')}
							className="p-2 rounded-md bg-neutral-700 text-white flex-1"
						>
							<option value="">Todos os status</option>
							<option value="pending">Pendente</option>
							<option value="in_progress">Em progresso</option>
							<option value="done">Concluído</option>
						</select>
					</>
				)}
			</FormFilter>

			{data && data.length > 0 ? (
				<div className="overflow-x-auto rounded-lg border border-neutral-700">
					<table className="w-full text-sm text-left">
						<thead className="bg-neutral-800 text-neutral-400 uppercase text-xs">
							<tr>
								<th className="px-4 py-3">Nome</th>
								<th className="px-4 py-3">Descrição</th>
								<th className="px-4 py-3">Metas</th>
								<th className="px-4 py-3">Responsável</th>
								<th className="px-4 py-3">Criado em</th>
								<th className="px-4 py-3"></th>
							</tr>
						</thead>
						<tbody className="divide-y divide-neutral-700">
							{data.map((project) => (
								<tr key={project.id} className="bg-neutral-900 hover:bg-neutral-800 transition-colors">
									<td className="px-4 py-3 font-medium">
										<div className="flex items-center gap-2">
											{project.name}
											<span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getStatusColor(project.status)} opacity-75 text-neutral-900`}>
												{formatStatus(project.status) ?? '—'}
											</span>
										</div>
									</td>
									<td className="px-4 py-3 text-neutral-400">{project.description ?? '—'}</td>
									<td className="px-4 py-3 text-neutral-400">{project.goals?.length ?? 0}</td>
									<td className="px-4 py-3 text-neutral-400">{project.user?.name ?? '—'}</td>
									<td className="px-4 py-3 text-neutral-400">
										{project.createdAt
											? format(new Date(project.createdAt), "dd 'de' MMM 'de' yyyy", { locale: ptBR })
											: '—'}
									</td>
									<td className="px-4 py-3">
										{isAdmin && (
											<DropdownMenu
												items={[
													{ label: 'Editar', onClick: () => openEdit(project) },
													{ label: 'Excluir', onClick: () => openDelete(project), variant: 'danger' },
												]}
											/>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : isAdmin ? (
				<div className="flex flex-col items-start gap-4">
					<p className="text-neutral-400">Nenhum projeto encontrado.</p>
				</div>
			) : (
				<div className="flex flex-col items-start gap-2">
					<p className="text-white font-medium">Ops, aparentemente você não possui nenhum projeto.</p>
					<p className="text-neutral-400">Peça para um administrador encaixá-lo em um projeto.</p>
				</div>
			)}

			{modalFormOpen && (
				<ProjectFormModal
					project={selectedProject}
					onClose={closeFormModal}
					onSuccess={() => refetch()}
				/>
			)}

			{modalDeleteOpen && (
				<ProjectDeleteModal
					project={selectedProject}
					onClose={closeDeleteModal}
					onSuccess={() => refetch()}
				/>
			)}
		</div>
	);
}
