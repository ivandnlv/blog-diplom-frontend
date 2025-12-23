import type { NuxtUiConfigType } from '~/types/utilities/nuxt-ui-config-type'

export const button: NuxtUiConfigType['button'] = {
  slots: {
    base: '!font-semibold cursor-pointer disabled:opacity-50'
  },
  variants: {
    color: {
      primary: 'active:!bg-primary/100 disabled:opacity-50 disabled:text-inverted/50',
      secondary: 'hover:text-(--ui-success-muted)'
    },
    size: {
      md: {
        base: 'px-5 py-2.5 rounded-xl font-bold transition-colors shadow-lg text-sm'
      }
    }
  },
  compoundVariants: [
    {
      color: 'secondary',
      variant: 'solid',
      class: 'bg-zinc-800 bg-zinc-800 hover:text-inverted hover:bg-zinc-700 disabled:bg-zinc-800 disabled:text-inverted'
    },
    {
      color: 'success',
      variant: 'solid',
      class: `bg-(--ui-success-muted) hover:bg-success text-success hover:text-(--ui-success-muted) ring ring-success/20 disabled:bg-(--ui-success-muted) disabled:hover:text-success`
    },
    {
      color: 'error',
      variant: 'solid',
      class: `bg-(--ui-error-muted) hover:bg-error text-error hover:text-(--ui-error-muted) ring ring-error/20 disabled:bg-(--ui-error-muted) disabled:text-error`
    }
  ]
}
