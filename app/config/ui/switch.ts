import type { NuxtUiConfigType } from '~/types/utilities/nuxt-ui-config-type'

export const uiSwitch: NuxtUiConfigType['switch'] = {
  slots: {
    base: 'data-[state=unchecked]:bg-zinc-800',
    thumb: 'bg-[#fff]'
  },
  variants: {
    color: {
      primary: {
        base: ''
      }
    }
  }
}
