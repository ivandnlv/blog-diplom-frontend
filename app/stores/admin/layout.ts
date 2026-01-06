import type { AppRouteName } from '~/types/app/router'
import type { RouteLocationRaw } from 'vue-router'

export const useAdminLayoutStore = defineStore('store:admin-layout', () => {
  const backRoute = ref<RouteLocationRaw | null>(null)

  const setBackRoute = (value: RouteLocationRaw | null) => {
    backRoute.value = value
  }

  return {
    backRoute,
    setBackRoute
  }
})
