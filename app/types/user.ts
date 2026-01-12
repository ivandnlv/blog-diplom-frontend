import type { BaseEntity } from '~/types/index'

export type UserRole = 'ADMIN'

export interface UserEntity extends BaseEntity {
  email: string
  role: UserRole
  username: string
  avatarUrl?: string
}
