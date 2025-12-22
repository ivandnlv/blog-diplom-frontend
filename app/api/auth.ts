import type { BaseSuccessResponse } from '~/types/api'
import { apiFetch } from '~/plugins/fetch'

export interface AuthApiType {
  Login: {
    Body: {
      email: string
      password: string
    }
    Response: BaseSuccessResponse<{
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
  }
}
