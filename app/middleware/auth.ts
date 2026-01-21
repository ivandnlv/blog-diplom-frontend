export default defineNuxtRouteMiddleware((to) => {
  if (typeof to?.name !== 'string') return

  const authStore = useAuthStore()
  const { isLoggedIn } = storeToRefs(authStore)

  if (!isLoggedIn.value) {
    throw createError({
      statusCode: 404
    })
  }
})
