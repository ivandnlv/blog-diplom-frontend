<script setup lang="ts">
import { adminPostsApi } from '~/api/admin-posts'
import { SITEMAP } from '~/constants/app/sitemap'

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
</script>

<template>
  <u-skeleton
    v-if="pending"
    class="size-full"
  />

  <div
    v-else-if="data"
    class="flex flex-col w-full h-full gap-8"
  >
    <h1 class="title-main">
      {{ SITEMAP.adminPostsId.name }}
    </h1>

    <UCard>
      <AdminPostsForm
        :post="data"
      />
    </UCard>
  </div>
</template>
