<script setup lang="ts">
import type { PostCommentEntity } from '~/types/post-comment'
import { formatISOToDateWithConditions } from '~/helpers/format/date'

const props = defineProps<{
  comment: PostCommentEntity
}>()

const createdFormatted = computed(() => formatISOToDateWithConditions(props.comment.createdAt))

const name = computed(() => {
  if (!props.comment.authorEmail) {
    return props.comment.authorName
  }

  return `${props.comment.authorName} (${props.comment.authorEmail})`
})
</script>

<template>
  <UCard
    :ui="{
      body: 'flex flex-col gap-2'
    }"
  >
    <div class="flex items-center gap-2">
      <UAvatar
        :alt="name"
      />

      <span>{{ name }}</span>

      <span class="text-zinc-500 ml-auto">
        {{ createdFormatted }}
      </span>
    </div>

    <p>{{ comment.content }}</p>
  </UCard>
</template>
