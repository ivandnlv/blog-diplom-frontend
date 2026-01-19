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
  name: 'Редактирование публикации',
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

const adminComments: SitemapRoute = {
  name: 'Комментарии',
  route: {
    name: APP_ROUTES.adminComments
  },
  icon: ICONS_HERO.CHAT_BUBBLE_LEFT_RIGHT_20_SOLID
}

export const adminSitemap = {
  adminPosts,
  adminPostsId,
  adminPostsCreate,
  adminComments
}
