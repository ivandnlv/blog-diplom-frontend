import type { NuxtUiConfigType } from '~/types/utilities/nuxt-ui-config-type'

export const modal: NuxtUiConfigType['modal'] = {
  slots: {
    header: 'lg:p-0 lg:min-h-0',
    content: 'divide-none'
  }
}
