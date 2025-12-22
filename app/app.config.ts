import * as uiConfigs from '~/config/ui'

export default defineAppConfig({
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate'
    },
    ...uiConfigs
  }
})
