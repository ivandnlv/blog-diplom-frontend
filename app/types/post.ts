import type { BaseEntity } from '~/types/index'

export interface PostMinEntity extends BaseEntity {
  title: string
  slug: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export interface PostEntity extends PostMinEntity {
  content: string
}
