import type { BaseSuccessResponse } from '~/types/api'

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
    return await $fetch('/auth/login', {
      method: 'POST',
      body
    })
  }
}
