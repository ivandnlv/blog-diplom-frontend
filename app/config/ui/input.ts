import type { TVConfig } from '@nuxt/ui'
import type * as ui from '#build/ui'

export const input: TVConfig<typeof ui>['input'] = {
  slots: {
    root: 'w-full'
  }
}
