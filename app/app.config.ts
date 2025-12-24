import * as uiConfigs from '~/config/ui'

export default defineAppConfig({
  ui: {
    colors: {
      primary: 'indigo',
      secondary: 'zinc',
      neutral: 'slate'
    },
    ...uiConfigs,
    switch: uiConfigs.uiSwitch
  }
})
