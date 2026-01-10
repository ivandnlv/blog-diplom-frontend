import { AUTH_ACCESS_TOKEN_COOKIE_KEY } from '~/constants/auth'
import type { UserEntity } from '~/types/user'
import { useTryCatchWithLoading } from '~/composables/use-try-catch-with-loading'
import { usersApi } from '~/api/users'
import { SITEMAP } from '~/constants/app/sitemap'

export const useAuthStore = defineStore('store:auth', () => {
  const accessToken = useCookie<string | null>(AUTH_ACCESS_TOKEN_COOKIE_KEY, {
    default: () => null
  })

  const user = ref<UserEntity | null>(null)

  const isLoggedIn = computed(() => !!accessToken.value)

  const logout = async (redirectToAuth: boolean = true) => {
    accessToken.value = null
    user.value = null

    if (import.meta.server || !redirectToAuth) return

    await navigateTo(SITEMAP.auth.route)
  }

  const { runWithLoading: fetchMe, isLoading: isMeLoading } = useTryCatchWithLoading(async () => {
    if (!accessToken.value) return

    const { data } = await usersApi.me()

    user.value = data
  }, {
    catchCallback: () => logout()
  })

  const setUser = (value: UserEntity) => {
    user.value = value
  }

  return {
    accessToken,
    isLoggedIn,
    fetchMe,
    isMeLoading,
    user,
    logout,
    setUser
  }
})
