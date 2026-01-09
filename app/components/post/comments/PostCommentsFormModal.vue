<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  postId: number
  parentId?: number
  successFunction?: () => void
}>(), {
  title: 'Ответить на комментарий',
  description: 'Ответьте на комментарий пользователя',
  successFunction: () => {}
})
</script>

<template>
  <UModal
    :title="title"
    :description="description"
  >
    <template #body>
      <PostCommentsForm
        :post-id="postId"
        :button-block="true"
        :parent-id="parentId"
        @success="successFunction"
      />
    </template>
  </UModal>
</template>
