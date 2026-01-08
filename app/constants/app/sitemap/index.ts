import type { SitemapRoute } from '~/types/app/router'
import { APP_ROUTES } from '~/constants/app/routes'
import { adminSitemap } from '~/constants/app/sitemap/admin'

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

const postsSlug: SitemapRoute = {
  name: 'Публикация',
  route: {
    name: APP_ROUTES.postsSlug
  }
}

export const SITEMAP = {
  ...adminSitemap,
  index,
  auth,
  authRegister,
  authLogout,
  postsSlug
}
