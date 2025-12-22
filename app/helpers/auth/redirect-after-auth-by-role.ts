import type { UserRole } from '~/types/user'
import { SITEMAP } from '~/constants/app/sitemap'

export async function redirectAfterAuthByRole(role: UserRole) {
  if (role === 'ADMIN') {
    await navigateTo(SITEMAP.adminPosts.route)

    return
  }

  await navigateTo(SITEMAP.index.route)
}
