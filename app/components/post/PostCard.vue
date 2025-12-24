<script setup lang="ts">
import type { PostEntity } from '~/types/post'

defineProps<{
  post: PostEntity
}>()
</script>

<template>
  <UCard>
    <div class="flex flex-col gap-3">
      <span class="text-xl font-bold">{{ post.title }}</span>

      <p class="text-zinc-400 line-clamp-4">
        {{ post.content }}
      </p>
    </div>
  </UCard>
</template>
