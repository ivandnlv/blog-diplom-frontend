<script setup lang="ts">
import { postsApi } from '~/api/posts'
import { SITEMAP } from '~/constants/app/sitemap'

const route = useRoute()
const slug = String(route.params.slug)

async function getPost() {
  const { data } = await postsApi.getBySlug(slug)

  return data
}

const { data, pending } = useAsyncData(`data:post-${slug}`, getPost, { default: () => null })
</script>

<template>
  <div class="flex flex-col gap-8">
    <h1>
      {{ SITEMAP.postsSlug.name }}

      <USkeleton
        v-if="pending"
        class="w-12 h-6"
      />
      <template v-else-if="data">
        {{ data.title }}
      </template>
    </h1>

    <UiLoader v-if="pending" />

    <UCard v-else-if="data">
      <div v-html="data.content" />
    </UCard>
  </div>
</template>
