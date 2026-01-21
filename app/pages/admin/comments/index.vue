<script setup lang="ts">
import { adminCommentsApi } from '~/api/admin/admin-comments'
import type { PostCommentEntity } from '~/types/post-comment'
import type { TableColumn } from '#ui/components/Table.vue'
import { formatBoolean } from '~/helpers/format/boolean'
import { ICONS_HERO } from '~/constants/icons/hero'
import { LazyAdminCommentsDeleteModal, LazyAdminCommentsModerateModal } from '#components'
import { SITEMAP } from '~/constants/app/sitemap'

definePageMeta({
  layout: 'admin'
})

const LIMIT = 20

const { getPaginationQuery, setTotal, pagesCount, currentPage, total } = usePagination({
  uniqueId: 'pagination:admin-comments',
  limit: LIMIT
})

const postId = ref<number | undefined>()

async function fetchComments() {
  const { data } = await adminCommentsApi.getList({
    ...getPaginationQuery(),
    postId: postId.value
  })

  setTotal(data.total)

  return data.items
}

const { data, pending, refresh } = useAsyncData('data:admin-comments', fetchComments, { default: () => [] as PostCommentEntity[] })

watch(currentPage, () => refresh())

const overlay = useOverlay()

const onCommentModerate = (comment: PostCommentEntity) => {
  overlay.create(LazyAdminCommentsModerateModal, {
    props: {
      comment,
      successFunction: refresh
    }
  }).open()
}
const onCommentDelete = (comment: PostCommentEntity) => {
  overlay.create(LazyAdminCommentsDeleteModal, {
    props: {
      comment,
      successFunction: refresh
    }
  }).open()
}
</script>

<template>
  <AdminUiPageContainer>
    <h1 class="title-main">
      Модерация комментариев
    </h1>

    <UiLoader v-if="pending" />

    <template v-else-if="data?.length">
      <AdminCommentsTable
        class="max-lg:hidden"
        :comments="data"
        @moderate="onCommentModerate"
        @delete="onCommentDelete"
      />

      <AdminCommentsCards
        class="lg:hidden"
        :comments="data"
        @moderate="onCommentModerate"
        @delete="onCommentDelete"
      />
    </template>

    <UiEmpty
      v-else
      title="Нет комментариев"
    />

    <UPagination
      v-if="pagesCount > 1"
      v-model:page="currentPage"
      :total="total"
      :items-per-page="LIMIT"
    />
  </AdminUiPageContainer>
</template>
