import type { SitemapRoute } from '~/types/app/router'
import { SITEMAP } from '~/constants/app/sitemap'

export const LAYOUT_ADMIN_ROUTES: SitemapRoute[] = [
  SITEMAP.adminUsers,
  SITEMAP.adminPosts,
  SITEMAP.adminComments
]
