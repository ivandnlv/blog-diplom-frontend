<script setup lang="ts">
import type { PostMinEntity } from '~/types/post'
import { POSTS_ADMIN_TABLE_COLUMNS } from '~/constants/posts/posts-admin-table-columns'
import { ICONS_HERO } from '~/constants/icons/hero'
import { formatBoolean } from '~/helpers/format/boolean'
import { formatISOtoDDMMYYYY } from '~/helpers/format/date'
import { LazyUiModalConfirm } from '#components'
import { SITEMAP } from '~/constants/app/sitemap'

defineProps<{
  posts: PostMinEntity[]
}>()

const overlay = useOverlay()
const modal = overlay.create(LazyUiModalConfirm, {
  props: {
    description: 'Вы действительно хотите удалить публикацию?'
  }
})
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
          @click="modal.open()"
        />
      </div>
    </template>
  </UTable>
</template>
