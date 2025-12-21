import type { AppRouteName } from '~/types/app/router'

export const APP_ROUTES = {
  index: 'index' as const,
  auth: 'auth' as const
} satisfies Record<string, AppRouteName>
