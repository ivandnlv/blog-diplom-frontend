import type { NuxtUiConfigType } from '~/types/utilities/nuxt-ui-config-type'

export const table: NuxtUiConfigType['table'] = {
  slots: {
    th: 'bg-muted px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest',
    tbody: 'divide-y-0 border-none',
    tr: `first:bg-default/80 first:border-b first:border-accented border-default`,
    td: 'bg-default text-white px-6 py-4',
    base: 'border-none divide-y-0 border-collapse',
    separator: 'hidden',
    root: 'bg-default/50 border border-default rounded-2xl overflow-hidden shadow-xl'
  }
}
