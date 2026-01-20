import type { NuxtUiConfigType } from '~/types/utilities/nuxt-ui-config-type'

export const modal: NuxtUiConfigType['modal'] = {
  slots: {
    header: 'p-0 min-h-0',
    content: 'divide-none'
  }
}
