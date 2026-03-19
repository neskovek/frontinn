import { createFileRoute, notFound } from '@tanstack/react-router'
import { useAuth } from '#/hooks/useAuth'
import { decodeToken } from '#/lib/token'
import NotFound from '#/components/NotFound'

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
  component: RouteComponent,
})

function RouteComponent() {
  const { role } = useAuth()

  if (role !== 'admin') {
    return <NotFound />
  }

  return <div>Hello "/_authenticated/users"!</div>
}
