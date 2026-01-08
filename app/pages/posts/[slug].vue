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
  <div class="flex flex-col gap-12">
    <h1 class="title-main">
      <USkeleton
        v-if="pending"
        class="w-12 h-6"
      />
      <template v-else-if="data">
        {{ data.title }}
      </template>
      <template v-else>
        {{ SITEMAP.postsSlug.name }}
      </template>
    </h1>

    <UiLoader v-if="pending" />

    <template v-else-if="data">
      <UCard>
        <UiHtmlContent :content="data.content" />
      </UCard>

      <ClientOnly>
        <PostComments
          :post="data"
        />
      </ClientOnly>
    </template>
  </div>
</template>
