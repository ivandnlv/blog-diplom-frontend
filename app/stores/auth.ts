import { AUTH_ACCESS_TOKEN_COOKIE_KEY } from '~/constants/auth'
import type { UserEntity } from '~/types/user'
import { authApi, type AuthApiType } from '~/api/auth'
import { useTryCatchWithLoading } from '~/composables/use-try-catch-with-loading'
import { usersApi } from '~/api/users'

export const useAuthStore = defineStore('store:auth', () => {
  const accessToken = useCookie<string | null>(AUTH_ACCESS_TOKEN_COOKIE_KEY, {
    default: () => null
  })

  const user = ref<UserEntity | null>(null)

  const isLoggedIn = computed(() => !!(accessToken.value || user.value))

  const { runWithLoading: login, isLoading: isLoggingIn } = useTryCatchWithLoading(async (body: AuthApiType['Login']['Body']) => {
    const { data } = await authApi.login(body)

    accessToken.value = data.accessToken
  })

  const { runWithLoading: fetchMe, isLoading: isMeLoading } = useTryCatchWithLoading(async () => {
    const { data } = await usersApi.me()

    user.value = data
  })

  return {
    accessToken,
    isLoggedIn,
    login,
    isLoggingIn,
    fetchMe,
    isMeLoading
  }
})
