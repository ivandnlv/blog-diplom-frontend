<script setup lang="ts">
import type { PostMinEntity } from '~/types/post'
import { POSTS_ADMIN_TABLE_COLUMNS } from '~/constants/posts/posts-admin-table-columns'
import { ICONS_HERO } from '~/constants/icons/hero'
import { formatBoolean } from '~/helpers/format/boolean'
import { formatISOtoDDMMYYYY } from '~/helpers/format/date'
import { LazyUiModalConfirm } from '#components'
import { SITEMAP } from '~/constants/app/sitemap'
import { adminPostsApi } from '~/api/admin-posts'

defineProps<{
  posts: PostMinEntity[]
}>()

const emit = defineEmits<{
  (e: 'deleted'): void
}>()

async function deletePost(id: number) {
  await adminPostsApi.delete(id)

  useSuccessNotification('Публикация удалена!')

  emit('deleted')
}

const deletePostWithTryCatch = useTryCatch(deletePost)

const overlay = useOverlay()

const onModalOpen = (postId: number) => {
  overlay.create(LazyUiModalConfirm, {
    props: {
      description: 'Вы действительно хотите удалить публикацию?',
      onConfirm: () => deletePostWithTryCatch(postId)
    }
  }).open()
}
</script>

<template>
  <UTable
    :data="posts"
    :columns="POSTS_ADMIN_TABLE_COLUMNS"
  >
    <template #published-cell="{ row }">
      {{ formatBoolean(row.original.published) }}
    </template>

    <template #createdAt-cell="{ row }">
      {{ row.original?.createdAt ? formatISOtoDDMMYYYY(row.original.createdAt) : '-' }}
    </template>

    <template #updatedAt-cell="{ row }">
      {{ row.original?.updatedAt ? formatISOtoDDMMYYYY(row.original.updatedAt) : '-' }}
    </template>

    <template #actions-cell="{ row }">
      <div class="flex gap-4 items-center">
        <UButton
          :to="{
            ...SITEMAP.adminPostsId.route,
            params: {
              id: row.original.id
            }
          }"
          :icon="ICONS_HERO.PENCIL_SQUARE_16_SOLID"
        />

        <UButton
          color="error"
          :icon="ICONS_HERO.TRASH_16_SOLID"
          @click="() => onModalOpen(row.original.id)"
        />
      </div>
    </template>
  </UTable>
</template>
