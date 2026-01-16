<script setup lang="ts">
import type { PostMinEntity } from '~/types/post'
import { formatISOToDateWithConditions } from '~/helpers/format/date'
import { SITEMAP } from '~/constants/app/sitemap'

const props = defineProps<{
  post: PostMinEntity
}>()

const dateStr = computed(() => {
  return formatISOToDateWithConditions(props.post.createdAt)
})

const postLink = computed(() => ({
  ...SITEMAP.postsSlug.route,
  params: {
    slug: props.post.slug
  }
}))
</script>

<template>
  <UCard>
    <div class="flex flex-col gap-3">
      <span class="text-dimmed">{{ dateStr }}</span>

      <NuxtImg
        class="rounded-lg overflow-hidden w-full max-h-[350px] object-cover"
        :src="post?.thumbnailUrl"
        loading="lazy"
      />

      <NuxtLink
        class="text-xl text-default font-bold transition-colors hover:text-primary"
        :to="postLink"
      >
        {{ post.title }}
      </NuxtLink>
    </div>
  </UCard>
</template>
