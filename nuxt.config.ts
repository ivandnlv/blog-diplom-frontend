export default defineNuxtConfig({

  modules: ['@nuxt/eslint', '@nuxt/ui', '@pinia/nuxt', '@vueuse/nuxt', '@nuxt/image', '@nuxtjs/device'],

  plugins: [
    '~/plugins/fetch',
    '~/plugins/auth'
  ],

  devtools: {
    enabled: false
  },

  css: ['~/assets/css/main.css'],

  ui: {
    theme: {
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'gray', 'white']
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/ui': {
      ssr: false
    },
    '/admin/**': {
      ssr: false
    },
    '/my-profile': {
      ssr: false
    }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
