export default defineNuxtRouteMiddleware((to) => {
  if (typeof to?.name !== 'string') return

  if (!to.name.startsWith('admin')) return

  const authStore = useAuthStore()
  const { isLoggedIn } = storeToRefs(authStore)

  const { isAdmin } = storeToRefs(useSessionStore())

  if (!isLoggedIn.value || !isAdmin.value) {
    throw createError({
      statusCode: 404
    })
  }
})
