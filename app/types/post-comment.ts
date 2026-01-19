import type { BaseEntity } from '~/types/index'
import type { UserEntity } from '~/types/user'

export interface PostCommentEntity extends BaseEntity {
  postId: number
  parentId: string
  content: string
  isApproved: boolean
  createdAt: string
  updatedAt: string
  authorId?: number
  author?: UserEntity
  childrenCount?: number
}
