import type { AppRouteName } from '~/types/app/router'

export const APP_ROUTES: Record<string, AppRouteName> = {
  index: 'index' as const,
  auth: 'auth' as const,
  authRegister: 'auth-register' as const,
  authLogout: 'auth-logout' as const,
  adminPosts: 'admin-posts' as const,
  adminPostsId: 'admin-posts-id' as const,
  adminPostsCreate: 'admin-posts-create' as const,
  postsSlug: 'posts-slug' as const,
  adminComments: 'admin-comments' as const
}
