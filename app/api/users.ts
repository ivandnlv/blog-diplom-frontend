import type { UserEntity } from '~/types/user'
import type { BaseSuccessResponse } from '~/types/api'
import { apiFetch } from '~/plugins/fetch'

export const usersApi = {
  async me() {
    return await apiFetch<BaseSuccessResponse<UserEntity | null>>('/users/me')
  }
}
