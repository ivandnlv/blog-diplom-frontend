export const useSessionStore = defineStore('store:session', () => {
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)

  const isAdmin = computed(() => user.value?.role === 'ADMIN')

  return {
    isAdmin
  }
})
