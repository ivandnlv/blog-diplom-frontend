import { postsApi } from '~/api/posts'
import type { PostMinEntity } from '~/types/post'
import { promiseTimeout } from '@vueuse/core'

export const usePostsStore = defineStore('store:posts', () => {
  const { getPaginationQuery, setTotal, next, isLastPage } = usePagination({
    limit: 3,
    uniqueId: 'pagination:posts'
  })

  async function fetchPosts() {
    const { data } = await postsApi.getList(getPaginationQuery())

    setTotal(data.total)

    return data.items
  }

  const { data, pending } = useAsyncData('data:posts', fetchPosts, {
    default: () => [] as PostMinEntity[]
  })

  async function fetchMorePosts() {
    await promiseTimeout(1000)
    next()
    const newPosts = await fetchPosts()
    data.value = [...data.value, ...newPosts]
  }

  const { runWithLoading: fetchMoreWrapped, isLoading: morePending } = useTryCatchWithLoading(fetchMorePosts)

  return {
    data,
    pending,
    fetchMore: fetchMoreWrapped,
    morePending,
    isLastPage
  }
})
