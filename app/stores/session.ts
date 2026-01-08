import type { SessionSavedUser } from '~/types/session'

export const useSessionStore = defineStore('store:session', () => {
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)

  const isAdmin = computed(() => user.value?.role === 'ADMIN')

  const savedUserData = useCookie<SessionSavedUser | null>('cookie:session-saved-user')

  const setSavedUserData = (data: SessionSavedUser) => {
    savedUserData.value = data
  }

  const resetSavedUserData = () => {
    savedUserData.value = null
  }

  return {
    isAdmin,
    savedUserData,
    setSavedUserData,
    resetSavedUserData
  }
})
