import type { UserEntity } from '~/types/user'
import type { BaseSuccessResponse } from '~/types/api'

export const usersApi = {
  async me() {
    return await $fetch<BaseSuccessResponse<UserEntity | null>>('/users/me')
  }
}
