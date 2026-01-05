import type { NuxtUiConfigType } from '~/types/utilities/nuxt-ui-config-type'

export const textarea: NuxtUiConfigType['textarea'] = {
  slots: {
    root: 'w-full'
  },
  variants: {
    size: {
      md: {
        base: 'rounded-xl px-4 py-2.5'
      }
    }
  }
}
