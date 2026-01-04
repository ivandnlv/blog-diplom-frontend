import type { BasePaginationQuery, BasePaginationResponse, BaseResponse, BaseSuccessResponse } from '~/types/api'
import type { PostEntity, PostMinEntity } from '~/types/post'
import { apiFetch } from '~/plugins/fetch'

export interface AdminPostsApiType {
  GetList: {
    Request: BasePaginationQuery
    Response: BasePaginationResponse<PostMinEntity>
  }

  GetById: {
    Response: BaseSuccessResponse<PostEntity>
  }
}

export const adminPostsApi = {
  async getList(query: AdminPostsApiType['GetList']['Request'] = {}) {
    return await apiFetch<AdminPostsApiType['GetList']['Response']>('/admin/posts', {
      query
    })
  },

  async getById(id: string) {
    return await apiFetch<AdminPostsApiType['GetById']['Response']>(`/admin/posts/${id}`)
  }
}
