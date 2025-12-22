import type { BasePaginationQuery, BasePaginationResponse } from '~/types/api'
import type { PostEntity } from '~/types/post'
import { apiFetch } from '~/plugins/fetch'

export interface AdminPostsApiType {
  GetList: {
    Request: BasePaginationQuery
    Response: BasePaginationResponse<PostEntity>
  }
}

export const adminPostsApi = {
  async getList(query: AdminPostsApiType['GetList']['Request'] = {}) {
    return await apiFetch<AdminPostsApiType['GetList']['Response']>('/admin/posts', {
      query
    })
  }
}
