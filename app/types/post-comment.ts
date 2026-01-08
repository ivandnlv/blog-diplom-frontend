import type { BaseEntity } from '~/types/index'

export interface PostCommentEntity extends BaseEntity {
  postId: string
  parentId: string
  authorName: string
  authorEmail: string
  content: string
  isApproved: boolean
  createdAt: string
  updatedAt: string
}
