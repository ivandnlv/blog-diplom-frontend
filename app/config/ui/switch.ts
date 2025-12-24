import type { NuxtUiConfigType } from '~/types/utilities/nuxt-ui-config-type'

export const uiSwitch: NuxtUiConfigType['switch'] = {
  slots: {
    base: 'data-[state=unchecked]:bg-zinc-800',
    thumb: 'bg-inverted'
  },
  variants: {
    color: {
      primary: {
        base: ''
      }
    }
  }
}
