import { adminPostsApi } from '~/api/admin-posts'
import type { PostEntity } from '~/types/post'

export const useAdminPostsStore = defineStore('store:admin-posts', () => {
  const { data, pending } = useAsyncData('data:admin-posts', async () => {
    const { data } = await adminPostsApi.getList()

    return data.items
  }, { default: () => [] as PostEntity[] })

  return {
    data,
    pending
  }
})
