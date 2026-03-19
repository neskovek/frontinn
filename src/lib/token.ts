import { jwtDecode } from 'jwt-decode'

interface TokenPayload {
  sub: string
  email: string
  role: 'admin' | 'hero'
}

export function decodeToken(token: string): TokenPayload | null {
  try {
    return jwtDecode<TokenPayload>(token)
  } catch {
    return null
  }
}
