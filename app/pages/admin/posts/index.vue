<script setup lang="ts">
import { SITEMAP } from '~/constants/app/sitemap'
import { useAdminPostsApi } from '~/composables/admin/use-admin-posts-api'

definePageMeta({
  layout: 'admin'
})

const LIMIT = 20

const { data, pending, pagesCount, currentPage, total, resetAndRefresh } = useAdminPostsApi('admin-posts', LIMIT)

const emptyDescription = `Создайте первую публикацию <br/> С помощью кнопки «Создать»`
</script>

<template>
  <AdminUiPageContainer>
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

    <UiEmpty
      v-else
      title="Нет публикаций"
      :description="emptyDescription"
    />

    <UPagination
      v-if="pagesCount > 1"
      v-model:page="currentPage"
      :total="total"
      :items-per-page="LIMIT"
    />
  </AdminUiPageContainer>
</template>
