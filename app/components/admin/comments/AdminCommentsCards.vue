<script setup lang="ts">
import type { PostCommentEntity } from '~/types/post-comment'
import type { EntityCardField } from '~/types/admin/ui/entity-card'
import { SITEMAP } from '~/constants/app/sitemap'
import { formatBoolean } from '../../../helpers/format/boolean'
import { ICONS_HERO } from '~/constants/icons/hero'

defineProps<{
  comments: PostCommentEntity[]
}>()

const emit = defineEmits<{
  (e: 'moderate' | 'delete', comment: PostCommentEntity): void
}>()

const fields: EntityCardField<PostCommentEntity>[] = [
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
  }
]
</script>

<template>
  <AdminUiEntityCardList
    :data="comments"
    :fields="fields"
    :ui="{
      root: 'max-md:flex max-md:flex-col'
    }"
  >
    <template #author-row="{ item }">
      <ULink
        class="text-primary"
        :to="{
          ...SITEMAP.adminUsersId.route,
          params: {
            id: item.author.id
          }
        }"
      >
        {{ item?.author?.email ? item.author.email : '-' }}
      </ULink>
    </template>

    <template #postId-row="{ item }">
      <ULink
        :to="{
          ...SITEMAP.adminPostsId.route,
          params: {
            id: item.postId
          }
        }"
      >
        {{ item.postId }}
      </ULink>
    </template>

    <template #moderationReason-row="{ item }">
      <span>{{ item?.moderationReason || 'Отсутствует' }}</span>
    </template>

    <template #isApproved-row="{ item }">
      {{ formatBoolean(item?.isApproved, ['Видят все', 'Скрыто']) }}
    </template>

    <template #item-bottom="{ item }">
      <div class="flex flex-col gap-4 mt-auto">
        <UButton
          block
          :color="item.isApproved ? 'secondary' : 'primary'"
          @click="emit('moderate', item)"
        >
          {{ item.isApproved ? 'Скрыть' : 'Опубликовать' }}
        </UButton>

        <UButton
          block
          color="error"
          @click="emit('delete', item)"
        >
          Удалить
        </UButton>
      </div>
    </template>
  </AdminUiEntityCardList>
</template>
