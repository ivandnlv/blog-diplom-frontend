import type { BasePaginationQuery, BasePaginationResponse, BaseSuccessResponse } from '~/types/api'
import type { PostEntity, PostMinEntity } from '~/types/post'
import { apiFetch } from '~/plugins/fetch'

export interface PostsApiType {
  GetList: {
    Request: BasePaginationQuery
    Response: BasePaginationResponse<PostMinEntity>
  }
}

export const postsApi = {
  async getList(query: PostsApiType['GetList']['Request'] = {}) {
    return await apiFetch<PostsApiType['GetList']['Response']>('/posts', {
      query
    })
  },

  async getBySlug(slug: string) {
    return await apiFetch<BaseSuccessResponse<PostEntity>>(`/posts/${slug}`)
  }
}
