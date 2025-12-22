import { ONLY_UNAUTHORIZED_ROUTES } from '~/constants/app/only-unauthorized-routes'
import { SITEMAP } from '~/constants/app/sitemap'

export default defineNuxtRouteMiddleware((to) => {
  if (ONLY_UNAUTHORIZED_ROUTES.includes(to.name)) {
    const { isLoggedIn } = storeToRefs(useAuthStore())

    if (isLoggedIn.value) {
      return navigateTo(SITEMAP.index.route)
    }
  }
})
