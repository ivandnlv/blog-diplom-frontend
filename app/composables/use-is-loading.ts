import { useToggle } from '@vueuse/core'

export function useIsLoading() {
  const [isLoading, toggleLoading] = useToggle()

  function startLoading() {
    toggleLoading(true)
  }

  function finishLoading() {
    toggleLoading(false)
  }

  return {
    isLoading,
    startLoading,
    finishLoading
  }
}
