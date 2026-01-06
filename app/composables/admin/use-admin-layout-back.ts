import { useAdminLayoutStore } from '~/stores/admin/layout'
import type { RouteLocationRaw } from 'vue-router'

export const useAdminLayoutBack = (route: RouteLocationRaw) => {
  const store = useAdminLayoutStore()

  store.setBackRoute(route)

  onBeforeRouteLeave(() => {
    store.setBackRoute(null)
  })
}
