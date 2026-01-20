import type { BasePaginationQuery, BasePaginationResponse, BaseSuccessResponse } from '~/types/api'
import type { UserEntity } from '~/types/user'
import { apiFetch } from '~/plugins/fetch'

export interface AdminUsersApiType {
  GetList: {
    Query: BasePaginationQuery
    Response: BasePaginationResponse<UserEntity>
  }
  GetById: {
    Response: BaseSuccessResponse<UserEntity>
  }
  Post: {
    Body: {
      email: string
      password: string
      username: string
      avatarUrl?: string
    }
    Response: BaseSuccessResponse<UserEntity>
  }
}

export const adminUsersApi = {
  async getList(query: AdminUsersApiType['GetList']['Query'] = {}) {
    return apiFetch<AdminUsersApiType['GetList']['Response']>(`/admin/users`, { query })
  },

  async getById(id: number) {
    return apiFetch<AdminUsersApiType['GetById']['Response']>(`/admin/users/${id}`)
  },

  async post(body: AdminUsersApiType['Post']['Body']) {
    return apiFetch<AdminUsersApiType['Post']['Response']>('/admin/users', {
      method: 'POST',
      body
    })
  },

  async patch(userId: number, body: Partial<Omit<AdminUsersApiType['Post']['Body'], 'email'>>) {
    return apiFetch<AdminUsersApiType['Post']['Response']>(`/admin/users/${userId}`, {
      method: 'PATCH',
      body
    })
  },

  async delete(userId: number) {
    return apiFetch<BaseSuccessResponse>(`/admin/users/${userId}`, {
      method: 'DELETE'
    })
  }
}
