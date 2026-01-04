import { useTryCatch, type UseTryCatchHandler } from '~/composables/use-try-catch'
import { useIsLoading } from '~/composables/use-is-loading'

export interface UseTryCatchWithLoadingOptions {
  catchCallback?: ((e?: string) => void) | ((e?: string) => Promise<void>)
  finallyCallback?: () => void
}

export function useTryCatchWithLoading<T extends UseTryCatchHandler<ReturnType<T>, Parameters<T>>>(
  handler: T,
  { catchCallback, finallyCallback }: UseTryCatchWithLoadingOptions = {
    catchCallback: (_e) => {},
    finallyCallback: () => {}
  }
) {
  const { isLoading, startLoading, finishLoading } = useIsLoading()

  const runWithTryCatch = useTryCatch(handler, catchCallback, finallyCallback)

  async function runWithLoading(...args: Parameters<typeof handler>) {
    try {
      startLoading()

      return await runWithTryCatch(...args)
    } finally {
      finishLoading()
    }
  }

  return {
    isLoading,
    runWithLoading,
    runWithTryCatch,
    startLoading,
    finishLoading
  }
}
