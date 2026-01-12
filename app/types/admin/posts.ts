export interface AdminPostsBody {
  title: string
  content: string
  published?: boolean
  thumbnailUrl?: string
  contentImagesUrls?: string[]
}
