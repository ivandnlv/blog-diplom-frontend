<script setup lang="ts">
const props = withDefaults(defineProps<{
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
    :title="title"
    :description="description"
  >
    <template #body>
      <PostCommentsForm
        :post-id="postId"
        :button-block="true"
        :parent-id="parentId"
        @success="onSuccess"
      />
    </template>
  </UModal>
</template>
