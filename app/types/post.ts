import type { BaseEntity } from '~/types/index'

export interface PostEntity extends BaseEntity {
  title: string
  slug: string
  content: string
  published: string
  createdAt: string
  updatedAt: string
}
