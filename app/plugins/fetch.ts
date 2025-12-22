import type { NitroFetchRequest, $Fetch } from 'nitropack/types'
import { isBaseResponse } from '~/helpers/types/is-base-response'
import { formatErrorToString } from '~/helpers/format/string/format-error-to-string'

// eslint-disable-next-line import/no-mutable-exports
export let apiFetch: $Fetch<unknown, NitroFetchRequest>

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  apiFetch = $fetch.create({
    baseURL: `${import.meta.server ? config.public.apiBase : ''}/api`,
    onResponseError(response) {
      const responseData = response.response._data as unknown

      if (isBaseResponse(responseData)) {
        throw new Error(formatErrorToString(responseData.message))
      }
    }
  })

  return {
    provide: {
      apiFetch
    }
  }
})
