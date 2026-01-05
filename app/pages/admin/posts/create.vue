<script setup lang="ts">
import { SITEMAP } from '~/constants/app/sitemap'
import type { PostEntity } from '~/types/post'

definePageMeta({
  layout: 'admin'
})

const onPostCreate = async (post: PostEntity) => {
  await navigateTo({
    ...SITEMAP.adminPostsId.route,
    params: {
      id: post.id
    }
  })
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <h1 class="title-main">
      {{ SITEMAP.adminPostsCreate.name }}
    </h1>

    <UCard>
      <AdminPostsForm
        @success="onPostCreate"
      />
    </UCard>
  </div>
</template>
