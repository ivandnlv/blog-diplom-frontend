import type { SitemapRoute } from '~/types/app/router'
import { APP_ROUTES } from '~/constants/app/routes'
import { ICONS_HERO } from '~/constants/icons/hero'

const adminPosts: SitemapRoute = {
  name: 'Публикации',
  route: {
    name: APP_ROUTES.adminPosts
  },
  icon: ICONS_HERO.RECTANGLE_GROUP_20_SOLID
}

const adminPostsId: SitemapRoute = {
  name: 'Публикация',
  route: {
    name: APP_ROUTES.adminPostsId
  }
}

const adminPostsCreate: SitemapRoute = {
  name: 'Создание публикации',
  route: {
    name: APP_ROUTES.adminPostsCreate
  }
}

export const adminSitemap = {
  adminPosts,
  adminPostsId,
  adminPostsCreate
}
