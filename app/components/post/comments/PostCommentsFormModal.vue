<script setup lang="ts">
import type { PostCommentEntity } from '~/types/post-comment'

const props = withDefaults(defineProps<{
  comment: PostCommentEntity
  title?: string
  description?: string
  successFunction?: () => void
}>(), {
  title: 'Ответить на комментарий',
  description: 'Ответьте на комментарий пользователя',
  successFunction: () => {}
})

const emit = defineEmits<{
  (e: 'close', value: boolean): void
}>()

const onSuccess = () => {
  props.successFunction()
  emit('close', true)
}
</script>

<template>
  <UModal
    :ui="{
      body: 'flex flex-col gap-6'
    }"
  >
    <template #body>
      <UiModalText
        :title="title"
        :description="description"
      />

      <PostCommentsItem
        :comment="comment"
        :can-action="false"
      />

      <PostCommentsForm
        :post-id="comment.postId"
        :button-block="true"
        :parent-id="comment.id"
        @success="onSuccess"
      />
    </template>
  </UModal>
</template>
