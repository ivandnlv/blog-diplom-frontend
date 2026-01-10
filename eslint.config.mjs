// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      'vue/no-v-html': 0,
      '@typescript-eslint/no-explicit-any': 0
    }
  }
)
