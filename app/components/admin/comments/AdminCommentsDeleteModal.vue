<script setup lang="ts">
import type { PostCommentEntity } from '~/types/post-comment'
import { adminCommentsApi } from '~/api/admin-comments'

const props = withDefaults(defineProps<{
  comment: PostCommentEntity
  successFunction?: () => void
}>(), {
  successFunction: () => {}
})

async function deleteComment() {
  await adminCommentsApi.delete(props.comment.id)

  useSuccessNotification('Комментарий удален')

  props.successFunction()
}

const { runWithLoading: deleteCommentWrapped, isLoading: isDeletingComment } = useTryCatchWithLoading(deleteComment)
</script>

<template>
  <UiModalConfirm
    description="Вы действительно хотите удалить комментарий?"
    :confirm-btn-loading="isDeletingComment"
    @confirm="deleteCommentWrapped"
  >
    <PostCommentsItem
      :comment="comment"
      :can-action="false"
    />
  </UiModalConfirm>
</template>
