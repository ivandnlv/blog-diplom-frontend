<script setup lang="ts">
import { SITEMAP } from '~/constants/app/sitemap'
import { useAdminPostsStore } from '~/stores/admin/posts'

definePageMeta({
  layout: 'admin'
})

const store = useAdminPostsStore()
const { data, pending, pagesCount, currentPage, total } = storeToRefs(store)
</script>

<template>
  <div class="flex flex-col gap-8 h-full max-w-[1200px] pb-[120px] mx-auto w-full">
    <div class="flex items-center justify-between gap-6">
      <h1 class="title-main">
        {{ SITEMAP.adminPosts.name }}
      </h1>

      <UButton
        :to="SITEMAP.adminPostsCreate.route"
      >
        Создать
      </UButton>
    </div>

    <UiSkeletonTable
      v-if="pending"
    />

    <AdminPostsTable
      v-else-if="data?.length"
      :posts="data"
    />

    <UPagination
      v-if="pagesCount > 1"
      v-model:page="currentPage"
      :total="total"
    />
  </div>
</template>
