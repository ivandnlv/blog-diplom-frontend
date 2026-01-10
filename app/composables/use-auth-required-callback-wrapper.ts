import { LazyAuthModal } from '#components'

export type UseAuthRequiredCallbackWrapperCallback = ((...params: any[]) => void) | ((...params: any[]) => Promise<void>)
export const useAuthRequiredCallbackWrapper = (callback: UseAuthRequiredCallbackWrapperCallback) => {
  const authStore = useAuthStore()
  const { isLoggedIn } = storeToRefs(authStore)

  const overlay = useOverlay()
  const authModal = overlay.create(LazyAuthModal)

  return () => {
    if (isLoggedIn.value) {
      callback()

      return
    }

    authModal.open()
  }
}
