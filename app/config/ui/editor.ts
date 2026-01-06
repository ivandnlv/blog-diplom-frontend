import type { NuxtUiConfigType } from '~/types/utilities/nuxt-ui-config-type'

export const editor: NuxtUiConfigType['editor'] = {
  slots: {
    root: 'bg-default rounded-xl px-4 py-2.5 flex flex-col gap-8',
    base: 'sm:px-2'
  }
}
