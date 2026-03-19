import { useState } from 'react';
import { createFileRoute, notFound } from '@tanstack/react-router'
import { useAuth } from '#/hooks/useAuth'
import { decodeToken } from '#/lib/token'
import NotFound from '#/components/NotFound'
import { useGetUsers } from '#/hooks/useUser'
import { format } from 'date-fns'
import { DropdownMenu } from '#/components/DropdownMenu'
import { ptBR } from 'date-fns/locale'
import { UserFormModal } from '#/components/UserFormModal'
import { UserDeleteModal } from '#/components/UserDeleteModal'
import type { User } from '#/interfaces/user'

const TOKEN_KEY = '@frontinn:token'

export const Route = createFileRoute('/_authenticated/users')({
	beforeLoad: () => {
		if (typeof window !== 'undefined') {
			const token = localStorage.getItem(TOKEN_KEY)
			const payload = token ? decodeToken(token) : null
			if (!payload || payload.role !== 'admin') {
				throw notFound()
			}
		}
	},
	component: UsersComponent,
})

function UsersComponent() {
	const { role } = useAuth()

	if (role !== 'admin') {
		return <NotFound />
	}

	const { data, isLoading, error, refetch } = useGetUsers();
	const [modalFormOpen, setModalFormOpen] = useState(false);
	const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

	const openCreate = () => {
		setSelectedUser(undefined);
		setModalFormOpen(true);
	};

	const openEdit = (user: User) => {
		setSelectedUser(user);
		setModalFormOpen(true);
	};

	const closeFormModal = () => {
		setModalFormOpen(false);
		setSelectedUser(undefined);
	};

	const openDelete = (user: User) => {
		setSelectedUser(user);
		setModalDeleteOpen(true);
	};

	const closeDeleteModal = () => {
		setModalDeleteOpen(false);
		setSelectedUser(undefined);
	};

	function formatRole(role: string) {
		const roleMap: Record<string, string> = {
			admin: 'Administrador',
			hero: 'Herói'
		};

		return roleMap[role] || role;
	};

	function getRoleColor(role: string) {
		const roleColorMap: Record<string, string> = {
			admin: 'bg-yellow-400',
			hero: 'bg-blue-400',
		};

		return roleColorMap[role] || 'bg-gray-400';
	}

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

	return (
		<div className="flex flex-col h-full text-white p-6">
			<h1 className="text-3xl font-bold mb-6">Usuários</h1>

			{data && data.length > 0 ? (
				<>
					<div className="flex justify-end mb-4">
						<button
							onClick={openCreate}
							className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
						>
							Adicionar
						</button>
					</div>
					<div className="overflow-x-auto rounded-lg border border-neutral-700">
						<table className="w-full text-sm text-left">
							<thead className="bg-neutral-800 text-neutral-400 uppercase text-xs">
								<tr>
									<th className="px-4 py-3">Nome</th>
									<th className="px-4 py-3">Personagem</th>
									<th className="px-4 py-3">Criado em</th>
									<th className="px-4 py-3"></th>
								</tr>
							</thead>
							<tbody className="divide-y divide-neutral-700">
								{data.map((user) => (
									<tr key={user.id} className="bg-neutral-900 hover:bg-neutral-800 transition-colors">
										<td className="px-4 py-3 font-medium">
											<div className="flex items-center gap-2">
												{user.name}
												<span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getRoleColor(user.role)} opacity-75 text-neutral-900`}>
													{formatRole(user.role) ?? '—'}
												</span>
											</div>
											<p className="text-neutral-400">{user.email}</p>
										</td>
										<td className="px-4 py-3 text-neutral-400">{user.character ?? '—'}</td>
										<td className="px-4 py-3 text-neutral-400">
											{user.createdAt ? format(new Date(user.createdAt), "dd 'de' MMM 'de' yyyy", { locale: ptBR }) : '—'}
										</td>
										<td className="px-4 py-3">
											<DropdownMenu
												items={[
													{ label: 'Editar', onClick: () => openEdit(user) },
													{ label: 'Excluir', onClick: () => openDelete(user), variant: 'danger' },
												]}
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
					<p className="text-neutral-400">Nenhum usuário encontrado.</p>
					<button
						onClick={openCreate}
						className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
					>
						Adicionar
					</button>
				</div>
			)}

			{modalFormOpen && (
				<UserFormModal
					user={selectedUser}
					onClose={closeFormModal}
					onSuccess={() => refetch()}
				/>
			)}

			{modalDeleteOpen && (
				<UserDeleteModal
					user={selectedUser}
					onClose={closeDeleteModal}
					onSuccess={() => refetch()}
				/>
			)}
		</div>
	)
}
