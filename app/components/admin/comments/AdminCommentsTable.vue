<script setup lang="ts">
import type { PostCommentEntity } from '~/types/post-comment'
import type { TableColumn } from '#ui/components/Table.vue'
import { SITEMAP } from '~/constants/app/sitemap'
import { ICONS_HERO } from '~/constants/icons/hero'
import { formatBoolean } from '~/helpers/format/boolean'

defineProps<{
  comments: PostCommentEntity[]
}>()

const emit = defineEmits<{
  (e: 'moderate' | 'delete', comment: PostCommentEntity): void
}>()

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
</script>

<template>
  <UTable
    :data="comments"
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
          @click="emit('moderate', row.original)"
        />

        <UButton
          :icon="ICONS_HERO.TRASH_16_SOLID"
          color="error"
          @click="emit('delete', row.original)"
        />
      </div>
    </template>
  </UTable>
</template>
