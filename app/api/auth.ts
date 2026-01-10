import type { BaseSuccessResponse } from '~/types/api'
import { apiFetch } from '~/plugins/fetch'
import type { UserEntity } from '~/types/user'

export interface AuthApiType {
  Login: {
    Body: {
      email: string
      password: string
    }
    Response: BaseSuccessResponse<{
      user: UserEntity
      accessToken: string
    }>
  }

  Register: {
    Body: {
      email: string
      password: string
    }
    Response: BaseSuccessResponse<{
      user: UserEntity
      accessToken: string
    }>
  }
}

export const authApi = {
  async login(body: AuthApiType['Login']['Body']) {
    return await apiFetch<AuthApiType['Login']['Response']>('/auth/login', {
      method: 'POST',
      body
    })
  },

  async register(body: AuthApiType['Register']['Body']) {
    return await apiFetch<AuthApiType['Register']['Response']>('/auth/register', {
      method: 'POST',
      body
    })
  }
}
