import { SITEMAP } from '~/constants/app/sitemap'

export default defineNuxtRouteMiddleware(() => {
  const { isLoggedIn } = storeToRefs(useAuthStore())

  if (isLoggedIn.value) {
    return navigateTo(SITEMAP.index.route)
  }
})
