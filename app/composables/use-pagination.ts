import type { BasePaginationQuery } from '~/types/api'

export interface UsePaginationParams {
  startPage?: number
  limit?: number
  uniqueId?: string
}

export const usePagination = ({ limit = 10, startPage = 1, uniqueId = `${Math.ceil(Math.random() * 100)}` }: UsePaginationParams) => {
  const currentPage = useState<number>(`${uniqueId}:currentPage`, () => startPage)
  const total = useState<number>(`${uniqueId}:total`, () => 0)

  function setTotal(value: unknown | number) {
    if (typeof value !== 'number' || Number.isNaN(+value)) return

    total.value = value
  }

  function getPaginationQuery(): BasePaginationQuery {
    return {
      limit,
      page: currentPage.value
    }
  }

  function next() {
    currentPage.value += 1
  }

  function prev() {
    if (currentPage.value - 1 <= 1) {
      currentPage.value = 1

      return
    }

    currentPage.value -= 1
  }

  function setFirstPage() {
    currentPage.value = 1
  }

  const pagesCount = computed(() => {
    if (!total.value) return 0

    return Math.ceil(total.value / limit)
  })

  const isLastPage = computed(() => {
    if (!total.value) return true

    return currentPage.value >= pagesCount.value
  })

  return {
    isLastPage,
    setTotal,
    getPaginationQuery,
    next,
    prev,
    setFirstPage,
    pagesCount,
    currentPage,
    total
  }
}
