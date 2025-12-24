import type { NuxtUiConfigType } from '~/types/utilities/nuxt-ui-config-type'

export const table: NuxtUiConfigType['table'] = {
  slots: {
    th: 'bg-muted px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-widest',
    tbody: 'divide-y-0 border-none',
    tr: `first:bg-zinc-900/80 first:border-b first:border-zinc-800 border-[#27272a]`,
    td: 'bg-[#131316] text-white px-6 py-4',
    base: 'border-none divide-y-0 border-collapse',
    separator: 'hidden',
    root: 'bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl'
  }
}
