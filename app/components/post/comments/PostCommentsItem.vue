<script setup lang="ts">
import type { PostCommentEntity } from '~/types/post-comment'
import { formatISOToDateWithConditions } from '~/helpers/format/date'
import { LazyPostCommentsFormModal } from '#components'

const props = defineProps<{
  comment: PostCommentEntity
}>()

const emit = defineEmits<{
  (e: 'answered'): void
}>()

const createdFormatted = computed(() => formatISOToDateWithConditions(props.comment.createdAt))

const overlay = useOverlay()
const answerModal = overlay.create(LazyPostCommentsFormModal, {
  props: {
    postId: props.comment.postId,
    parentId: props.comment.id,
    successFunction: () => emit('answered')
  }
})

const name = computed(() => {
  if (!props.comment.authorEmail) {
    return props.comment.authorName
  }

  return `${props.comment.authorName} (${props.comment.authorEmail})`
})

const onAnswer = () => {
  answerModal.open()
}
</script>

<template>
  <UCard
    :class="props.comment.parentId ? 'ml-6' : ''"
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

    <UButton
      class="w-fit self-end"
      color="secondary"
      @click="onAnswer()"
    >
      Ответить
    </UButton>
  </UCard>
</template>
