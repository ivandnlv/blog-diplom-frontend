<script setup lang="ts">
import { adminCommentsApi } from '~/api/admin-comments'
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

const columns: TableColumn<PostCommentEntity>[] = [
  {
    accessorKey: 'author',
    header: 'Автор'
  },
  {
    accessorKey: 'postId',
    header: 'Публикация'
  },
  {
    accessorKey: 'content',
    header: 'Текст комментария'
  },
  {
    accessorKey: 'childrenCount',
    header: 'Кол-во ответов'
  },
  {
    accessorKey: 'moderationReason',
    header: 'Причина скрытия'
  },
  {
    accessorKey: 'isApproved',
    header: 'Видят все/скрыто'
  },
  {
    accessorKey: 'actions',
    header: ''
  }
]

const overlay = useOverlay()
const onShowModerateModal = (comment: PostCommentEntity) => {
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

    <UTable
      v-else-if="data?.length"
      :data="data"
      :columns="columns"
    >
      <template #author-cell="{ row }">
        <span>{{ row.original?.author?.email ? row.original.author.email : '-' }}</span>
      </template>

      <template #postId-cell="{ row }">
        <ULink
          :to="{
            ...SITEMAP.adminPostsId.route,
            params: {
              id: row.original.postId
            }
          }"
        >
          {{ row.original.postId }}
        </ULink>
      </template>

      <template #moderationReason-cell="{ row }">
        <span>{{ row.original?.moderationReason || '-' }}</span>
      </template>

      <template #isApproved-cell="{ row }">
        {{ formatBoolean(row.original.isApproved, ['Видят все', 'Скрыто']) }}
      </template>

      <template #actions-cell="{ row }">
        <div class="flex gap-4 items-center">
          <UButton
            :icon="row.original.isApproved ? ICONS_HERO.EYE_SLASH_16_SOLID : ICONS_HERO.EYE_16_SOLID"
            :color="row.original.isApproved ? 'secondary' : 'primary'"
            @click="onShowModerateModal(row.original)"
          />

          <UButton
            :icon="ICONS_HERO.TRASH_16_SOLID"
            color="error"
            @click="onCommentDelete(row.original)"
          />
        </div>
      </template>
    </UTable>

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
