import type { BasePaginationQuery, BasePaginationResponse } from '~/types/api'
import type { UserEntity } from '~/types/user'
import { apiFetch } from '~/plugins/fetch'

export interface AdminUsersApiType {
  GetList: {
    Query: BasePaginationQuery
    Response: BasePaginationResponse<UserEntity>
  }
}

export const adminUsersApi = {
  async getList(query: AdminUsersApiType['GetList']['Query'] = {}) {
    return apiFetch<AdminUsersApiType['GetList']['Response']>(`/admin/users`, { query })
  }
}
