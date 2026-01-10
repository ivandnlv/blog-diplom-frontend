import type { BasePaginationQuery, BasePaginationResponse, BaseSuccessResponse } from '~/types/api'
import type { PostCommentEntity } from '~/types/post-comment'
import { apiFetch } from '~/plugins/fetch'

export interface PostsCommentsApiType {
  Get: {
    Query: BasePaginationQuery & {
      parentId?: number
    }
    Response: BasePaginationResponse<PostCommentEntity>
  }
  Post: {
    Body: {
      content: string
      parentId?: number
    }
  }
}

export const postsCommentsApi = {
  async get(postId: number, query: PostsCommentsApiType['Get']['Query'] = {}) {
    return await apiFetch<PostsCommentsApiType['Get']['Response']>(`/posts/${postId}/comments`, {
      query
    })
  },

  async post(postId: number, body: PostsCommentsApiType['Post']['Body']) {
    return await apiFetch<BaseSuccessResponse>(`/posts/${postId}/comments`, {
      method: 'POST',
      body
    })
  }
}
