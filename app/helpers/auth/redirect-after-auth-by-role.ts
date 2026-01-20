import type { UserRole } from '~/types/user'
import { APP_ADMIN_INDEX_ROUTE, APP_INDEX_ROUTE } from '~/constants/app'

export async function redirectAfterAuthByRole(role: UserRole) {
  if (role === 'ADMIN') {
    return navigateTo(APP_ADMIN_INDEX_ROUTE.route)
  }

  return navigateTo(APP_INDEX_ROUTE.route)
}
