import type { NuxtUiConfigType } from '~/types/utilities/nuxt-ui-config-type'

export const avatar: NuxtUiConfigType['avatar'] = {
  slots: {
    root: 'bg-zinc-500',
    fallback: 'text-white'
  }
}
