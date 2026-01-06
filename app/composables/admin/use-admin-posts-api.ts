import { usePagination } from '~/composables/use-pagination'
import { adminPostsApi } from '~/api/admin-posts'
import type { PostEntity } from '~/types/post'

export const useAdminPostsApi = (uniqueId: string) => {
  const { getPaginationQuery, currentPage, setTotal, pagesCount, total, setFirstPage } = usePagination({
    limit: 20,
    uniqueId: 'admin-posts-main-store'
  })

  async function fetchPosts() {
    const { data } = await adminPostsApi.getList(getPaginationQuery())

    setTotal(data.total)

    return data.items
  }

  const { data, pending, refresh } = useAsyncData('data:admin-post', fetchPosts, { default: () => [] as PostEntity[] })

  watch(currentPage, () => refresh())

  const resetAndRefresh = () => {
    setFirstPage()
    refresh()
  }

  return {
    data,
    pending,
    currentPage,
    pagesCount,
    total,
    resetAndRefresh
  }
}
