import type { UserEntity } from '~/types/user'
import type { BaseSuccessResponse } from '~/types/api'
import { apiFetch } from '~/plugins/fetch'

export interface UsersApiType {
  Patch: {
    Body: {
      username?: string
      avatarUrl?: string
      newPassword?: string
    }
    Response: BaseSuccessResponse<UserEntity>
  }
}

export const usersApi = {
  async me() {
    return await apiFetch<BaseSuccessResponse<UserEntity | null>>('/users/me')
  },

  async patch(body: UsersApiType['Patch']['Body']) {
    return apiFetch<UsersApiType['Patch']['Response']>('/users/me', {
      method: 'PATCH',
      body
    })
  }
}
