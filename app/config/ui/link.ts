import type { NuxtUiConfigType } from '~/types/utilities/nuxt-ui-config-type'

export const link: NuxtUiConfigType['link'] = {
  compoundVariants: [
    {
      active: false,
      disabled: false,
      class: [
        'text-primary underline underline-offset-2',
        'hover:text-default',
        'transition-colors'
      ]
    }
  ]
}
