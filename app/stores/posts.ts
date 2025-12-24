import { postsApi } from '~/api/posts'
import type { PostEntity } from '~/types/post'

export const usePostsStore = defineStore('store:posts', () => {
  async function fetchPosts() {
    const { data } = await postsApi.getList()

    return data?.items ?? []
  }

  const { data, pending } = useAsyncData('data:posts', fetchPosts, {
    default: () => [] as PostEntity[]
  })

  return {
    data,
    pending
  }
})
