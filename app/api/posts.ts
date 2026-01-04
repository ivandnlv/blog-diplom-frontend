import type { BasePaginationResponse } from '~/types/api'
import type { PostMinEntity } from '~/types/post'
import { apiFetch } from '~/plugins/fetch'

export interface PostsApiType {
  GetList: {
    Response: BasePaginationResponse<PostMinEntity>
  }
}

export const postsApi = {
  async getList() {
    return await apiFetch<PostsApiType['GetList']['Response']>('/posts')
  }
}
