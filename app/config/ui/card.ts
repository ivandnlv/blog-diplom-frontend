import type { NuxtUiConfigType } from '~/types/utilities/nuxt-ui-config-type'

export const card: NuxtUiConfigType['card'] = {
  slots: {
    root: 'rounded-2xl',
    header: 'sm:p-5',
    body: 'sm:p-5 text-default',
    footer: 'sm:p-5'
  },
  variants: {
    variant: {
      solid: {
        root: 'ring ring-default'
      }
    }
  },
  defaultVariants: {
    variant: 'solid'
  }
}
