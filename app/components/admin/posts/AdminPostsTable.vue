<script setup lang="ts">
import type { PostMinEntity } from '~/types/post'
import { POSTS_ADMIN_TABLE_COLUMNS } from '~/constants/posts/posts-admin-table-columns'
import { ICONS_HERO } from '~/constants/icons/hero'
import { formatBoolean } from '~/helpers/format/boolean'
import { formatISOtoDDMMYYYY } from '~/helpers/format/date'
import { LazyUiModalConfirm } from '#components'
import { SITEMAP } from '~/constants/app/sitemap'
import { adminPostsApi } from '~/api/admin/admin-posts'
import { useTryCatch } from '~/composables/use-try-catch'

defineProps<{
  posts: PostMinEntity[]
}>()

const emit = defineEmits<{
  (e: 'delete', postId: number): void
}>()
</script>

<template>
  <UTable
    :data="posts"
    :columns="POSTS_ADMIN_TABLE_COLUMNS"
    :ui="{
      td: 'first:max-w-[250px] first:truncate nth-[2]:max-w-[150px] nth-[2]:truncate'
    }"
  >
    <template #title-cell="{ row }">
      <NuxtLink
        class="hover:text-primary transition-colors"
        :to="{
          ...SITEMAP.adminPostsId.route,
          params: {
            id: row.original.id
          }
        }"
      >{{ row.original.title }}</NuxtLink>
    </template>

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
          @click="emit('delete', row.original.id)"
        />
      </div>
    </template>
  </UTable>
</template>
