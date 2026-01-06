import type { RouteLocationRaw } from 'vue-router'

export type AppRouteName
  = 'index'
    | 'auth'
    | 'auth-register'
    | 'auth-logout'
    | 'admin-posts'
    | 'admin-posts-id'
    | 'admin-posts-create'

export interface SitemapRoute {
  name: string
  route: Exclude<RouteLocationRaw, string>
  icon?: string
}
