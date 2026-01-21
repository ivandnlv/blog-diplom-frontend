<script setup lang="ts">
import type { PostMinEntity } from '~/types/post'
import type { EntityCardField } from '~/types/admin/ui/entity-card'
import { SITEMAP } from '~/constants/app/sitemap'
import { formatBoolean } from '~/helpers/format/boolean'
import { formatISOtoDDMMYYYY } from '~/helpers/format/date'

defineProps<{
  posts: PostMinEntity[]
}>()

const emit = defineEmits<{
  (e: 'delete', postId: number): void
}>()

const fields: EntityCardField<PostMinEntity>[] = [
  {
    header: 'Заголовок',
    accessorKey: 'title'
  },
  {
    header: 'Код',
    accessorKey: 'slug'
  },
  {
    header: 'Опубликована',
    accessorKey: 'published'
  },
  {
    header: 'Дата создания',
    accessorKey: 'createdAt'
  },
  {
    header: 'Дата последнего изменения',
    accessorKey: 'updatedAt'
  }
]
</script>

<template>
  <AdminUiEntityCardList
    :data="posts"
    :fields="fields"
    :ui="{
      root: 'max-md:flex max-md:flex-col'
    }"
  >
    <template #title-row="{ item }">
      <NuxtLink
        class="text-primary"
        :to="{
          ...SITEMAP.adminPostsId.route,
          params: {
            id: item.id
          }
        }"
      >{{ item.title }}</NuxtLink>
    </template>

    <template #published-row="{ item }">
      {{ formatBoolean(item.published) }}
    </template>

    <template #createdAt-row="{ item }">
      {{ item.createdAt ? formatISOtoDDMMYYYY(item.createdAt) : '-' }}
    </template>

    <template #updatedAt-row="{ item }">
      {{ item?.updatedAt ? formatISOtoDDMMYYYY(item.updatedAt) : '-' }}
    </template>

    <template #item-bottom="{ item }">
      <div class="flex flex-col gap-4 mt-auto">
        <UButton
          block
          :to="{
            ...SITEMAP.adminPostsId.route,
            params: {
              id: item.id
            }
          }"
        >
          Редактировать
        </UButton>

        <UButton
          block
          color="error"
          @click="emit('delete', item.id)"
        >
          Удалить
        </UButton>
      </div>
    </template>
  </AdminUiEntityCardList>
</template>
