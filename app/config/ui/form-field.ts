import type { TVConfig } from '@nuxt/ui'
import type * as ui from '#build/ui'

export const formField: TVConfig<typeof ui>['formField'] = {
  slots: {
    root: 'w-full'
  }
}
