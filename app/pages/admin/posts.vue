<script setup lang="ts">
import { SITEMAP } from '~/constants/app/sitemap'
import { useAdminPostsStore } from '~/stores/admin/posts'
import { POSTS_ADMIN_TABLE_COLUMNS } from '~/constants/posts/posts-admin-table-columns'
import { formatISOtoDDMMYYYY } from '~/helpers/format/date'
import { formatBoolean } from '~/helpers/format/boolean'
import { ICONS_HERO } from '~/constants/icons/hero'

definePageMeta({
  layout: 'admin'
})

const store = useAdminPostsStore()
const { data, pending, pagesCount, currentPage, total } = storeToRefs(store)
</script>

<template>
  <div class="flex flex-col gap-8 h-full max-w-[1024px] pb-[120px] mx-auto w-full">
    <h1 class="title-main">
      {{ SITEMAP.adminPosts.name }}
    </h1>

    <UiSkeletonTable v-if="pending" />

    <UTable
      v-else-if="data?.length"
      :data="data"
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

      <template #actions-cell>
        <div class="flex gap-4 items-center">
          <UButton :icon="ICONS_HERO.PENCIL_SQUARE_16_SOLID" />

          <UButton
            color="error"
            :icon="ICONS_HERO.TRASH_16_SOLID"
          />
        </div>
      </template>
    </UTable>

    <UPagination
      v-if="pagesCount > 1"
      v-model:page="currentPage"
      :total="total"
    />
  </div>
</template>
