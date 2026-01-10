import { LazyAuthModal } from '#components'
import type { AuthModalProps } from '~/components/auth/AuthModal.vue'

export type UseAuthRequiredCallbackWrapperCallback = ((...params: any[]) => void) | ((...params: any[]) => Promise<void>)
export const useAuthRequiredCallbackWrapper = (callback: UseAuthRequiredCallbackWrapperCallback, modalProps?: AuthModalProps) => {
  const authStore = useAuthStore()
  const { isLoggedIn } = storeToRefs(authStore)

  const overlay = useOverlay()
  const authModal = overlay.create(LazyAuthModal, {
    props: modalProps
  })

  return () => {
    if (isLoggedIn.value) {
      callback()

      return
    }

    authModal.open()
  }
}
