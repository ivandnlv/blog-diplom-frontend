import type { BasePaginationResponse, BaseSuccessResponse } from '~/types/api'
import type { PostEntity, PostMinEntity } from '~/types/post'
import { apiFetch } from '~/plugins/fetch'

export interface PostsApiType {
  GetList: {
    Response: BasePaginationResponse<PostMinEntity>
  }
}

export const postsApi = {
  async getList() {
    return await apiFetch<PostsApiType['GetList']['Response']>('/posts')
  },

  async getBySlug(slug: string) {
    return await apiFetch<BaseSuccessResponse<PostEntity>>(`/posts/${slug}`)
  }
}
