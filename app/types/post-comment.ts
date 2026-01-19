import type { BaseEntity } from '~/types/index'
import type { UserEntity } from '~/types/user'

export interface PostCommentEntity extends BaseEntity {
  postId: number
  parentId: number
  content: string
  isApproved: boolean
  createdAt: string
  updatedAt: string
  authorId?: number
  author?: UserEntity
  childrenCount?: number
  moderationReason?: string
}
