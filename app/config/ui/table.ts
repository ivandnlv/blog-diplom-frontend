import type { NuxtUiConfigType } from '~/types/utilities/nuxt-ui-config-type'

export const table: NuxtUiConfigType['table'] = {
  slots: {
    th: 'bg-muted text-center',
    tr: '[&>td:first-of-type]:rounded-[8px_0_0_8px] [&>td:last-of-type]:rounded-[0_8px_8px_0] [&>th:first-of-type]:rounded-[8px_0_0_8px] [&>th:last-of-type]:rounded-[0_8px_8px_0]',
    td: 'bg-muted text-center',
    base: 'border-separate border-spacing-y-3',
    separator: 'hidden'
  }
}
