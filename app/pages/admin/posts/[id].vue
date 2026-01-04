<script setup lang="ts">
import { adminPostsApi } from '~/api/admin-posts'

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
    v-else
    class="flex flex-col w-full h-full"
  >
    <h1 class="title-main">
      {{ data.title }}
    </h1>
  </div>
</template>
