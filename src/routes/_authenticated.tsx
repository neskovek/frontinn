import { createFileRoute, Outlet, redirect, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import Header from '#/components/Header'
import Sidebar from '#/components/SideBar'
import { useAuth } from '#/hooks/useAuth'

const TOKEN_KEY = '@frontinn:token'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(TOKEN_KEY)
      if (!token) {
        throw redirect({ to: '/login' })
      }
    }
  },
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/login' })
    }
  }, [isAuthenticated])

  if (!isAuthenticated) return null

  return (
    <div className="flex h-screen bg-neutral-950">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
