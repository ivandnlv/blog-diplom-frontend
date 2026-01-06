<script setup lang="ts">
import { adminPostsApi } from '~/api/admin-posts'
import { SITEMAP } from '~/constants/app/sitemap'
import { useAdminLayoutBack } from '~/composables/admin/use-admin-layout-back'

definePageMeta({
  layout: 'admin'
})

const route = useRoute()

const id = String(route.params.id)

async function fetchPost() {
  const { data } = await adminPostsApi.getById(id)

  return data
}

const { data, pending } = useAsyncData(`post-data-${id}`, fetchPost, { default: () => null })

useAdminLayoutBack(SITEMAP.adminPosts.route)
</script>

<template>
  <div
    class="flex flex-col w-full h-full gap-8"
  >
    <h1 class="title-main">
      {{ SITEMAP.adminPostsId.name }}
    </h1>

    <UiLoader v-if="pending" />

    <template v-else-if="data">
      <AdminPostsPublished :post="data" />

      <UCard>
        <AdminPostsForm
          :post="data"
        />
      </UCard>
    </template>
  </div>
</template>
