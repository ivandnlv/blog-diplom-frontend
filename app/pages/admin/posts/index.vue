<script setup lang="ts">
import { SITEMAP } from '~/constants/app/sitemap'
import AdminUiEmpty from '~/components/admin/ui/AdminUiEmpty.vue'
import { useAdminPostsApi } from '~/composables/admin/use-admin-posts-api'

definePageMeta({
  layout: 'admin'
})

const { data, pending, pagesCount, currentPage, total, resetAndRefresh } = useAdminPostsApi('admin-posts')

const emptyDescription = `Создайте первую публикацию <br/> С помощью кнопки «Создать»`
</script>

<template>
  <div class="flex flex-col gap-8 h-full max-w-300 pb-30 mx-auto w-full">
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
      @deleted="resetAndRefresh"
    />

    <AdminUiEmpty
      v-else
      title="Нет публикаций"
      :description="emptyDescription"
    />

    <UPagination
      v-if="pagesCount > 1"
      v-model:page="currentPage"
      :total="total"
    />
  </div>
</template>
