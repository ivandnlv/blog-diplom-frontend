<script setup lang="ts">
import type { PostMinEntity } from '~/types/post'

defineProps<{
  post: PostMinEntity
}>()
</script>

<template>
  <UCard>
    <div class="flex flex-col gap-3">
      <span class="text-xl font-bold">{{ post.title }}</span>
    </div>
  </UCard>
</template>
