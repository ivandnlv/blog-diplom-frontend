import type { BasePaginationQuery, BasePaginationResponse, BaseSuccessResponse } from '~/types/api'
import type { AdminPostsBody } from '~/types/admin/posts'
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

  Post: {
    Body: AdminPostsBody
    Response: BaseSuccessResponse<PostEntity>
  }

  Patch: {
    Body: Partial<AdminPostsBody>
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
  },

  async post(body: AdminPostsApiType['Post']['Body']) {
    return await apiFetch<AdminPostsApiType['Post']['Response']>('/admin/posts', {
      method: 'POST',
      body
    })
  },

  async patch(postId: number, body: AdminPostsApiType['Patch']['Body']) {
    return await apiFetch<AdminPostsApiType['Patch']['Response']>(`/admin/posts/${postId}`, {
      method: 'PATCH',
      body
    })
  },

  async delete(postId: number) {
    return await apiFetch<BaseSuccessResponse>(`/admin/posts/${postId}`, {
      method: 'DELETE'
    })
  }
}
