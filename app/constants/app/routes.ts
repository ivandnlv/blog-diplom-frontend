import type { AppRouteName } from '~/types/app/router'

export const APP_ROUTES: Record<string, AppRouteName> = {
  index: 'index' as const,
  auth: 'auth' as const,
  authRegister: 'auth-register' as const,
  authLogout: 'auth-logout' as const
}
