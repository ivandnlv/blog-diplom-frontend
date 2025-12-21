import type { SitemapRoute } from '~/types/app/router'
import { APP_ROUTES } from '~/constants/app/routes'

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

export const SITEMAP = {
  index,
  auth
}
