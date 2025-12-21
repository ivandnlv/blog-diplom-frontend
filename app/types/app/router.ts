import type { TypesConfig, RouteLocationRaw } from 'vue-router'

export type AppRouteName = keyof TypesConfig['RouteNamedMap']

export interface SitemapRoute {
  name: string
  route: RouteLocationRaw
  icon?: string
}
