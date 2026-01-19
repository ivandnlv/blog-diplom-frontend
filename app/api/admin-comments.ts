import type { BasePaginationQuery, BasePaginationResponse, BaseResponse } from '~/types/api'
import type { PostCommentEntity } from '~/types/post-comment'
import { apiFetch } from '~/plugins/fetch'

export interface AdminCommentsApiType {
  GetList: {
    Query: BasePaginationQuery & {
      postId?: number
    }
    Response: BasePaginationResponse<PostCommentEntity>
  }
  Moderate: {
    Body: {
      isApproved: boolean
      moderationReason?: string
    }
  }
}

export const adminCommentsApi = {
  async getList(query: AdminCommentsApiType['GetList']['Query'] = {}) {
    return await apiFetch<AdminCommentsApiType['GetList']['Response']>('/admin/comments', { query })
  },

  async moderate(commentId: number, body: AdminCommentsApiType['Moderate']['Body']) {
    return await apiFetch<BaseResponse>(`/admin/comments/${commentId}/moderate`, {
      method: 'PATCH',
      body
    })
  },

  async delete(commentId: number) {
    return await apiFetch<BaseResponse>(`/admin/comments/${commentId}`, {
      method: 'DELETE'
    })
  }
}
