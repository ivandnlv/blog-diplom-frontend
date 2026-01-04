import type { SitemapRoute } from '~/types/app/router'
import { APP_ROUTES } from '~/constants/app/routes'
import { ICONS_HERO } from '~/constants/icons/hero'

const index: SitemapRoute = {
  name: 'Главная',
  route: {
    name: APP_ROUTES.index
  }
}

const auth: SitemapRoute = {
  name: 'Авторизация',
  route: {
    name: APP_ROUTES.auth
  }
}

const authRegister: SitemapRoute = {
  name: 'Регистрация',
  route: {
    name: APP_ROUTES.authRegister
  }
}

const authLogout: SitemapRoute = {
  name: 'Выйти',
  route: {
    name: APP_ROUTES.authLogout
  }
}

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

export const SITEMAP = {
  index,
  auth,
  authRegister,
  authLogout,

  adminPosts,
  adminPostsId
}
