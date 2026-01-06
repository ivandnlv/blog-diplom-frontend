<script setup lang="ts">
import { SITEMAP } from '~/constants/app/sitemap'
import { useAdminPostsStore } from '~/stores/admin/posts'
import AdminUiEmpty from '~/components/admin/ui/AdminUiEmpty.vue'

definePageMeta({
  layout: 'admin'
})

const store = useAdminPostsStore()
const { data, pending, pagesCount, currentPage, total } = storeToRefs(store)

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
      @deleted="store.resetAndRefresh"
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
