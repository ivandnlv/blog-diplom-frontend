import type { NuxtUiConfigType } from '~/types/utilities/nuxt-ui-config-type'

export const checkbox: NuxtUiConfigType['checkbox'] = {
  slots: {
    icon: 'text-[#09090b]'
  },
  variants: {
    size: {
      md: {
        base: 'size-5 rounded',
        icon: 'size-3.5'
      }
    }
  },
  compoundVariants: [
    {
      size: 'md',
      variant: 'list',
      class: {
        root: 'p-0'
      }
    }
  ],
  defaultVariants: {
    color: 'success'
  }
}
