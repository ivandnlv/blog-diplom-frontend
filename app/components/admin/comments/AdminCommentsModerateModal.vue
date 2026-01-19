<script setup lang="ts">
import type { PostCommentEntity } from '~/types/post-comment'
import { adminCommentsApi } from '~/api/admin-comments'
import { VALIDATION_ERRORS } from '~/constants/app/validation-errors'

const props = withDefaults(defineProps<{
  comment: PostCommentEntity
  successFunction?: () => void
}>(), {
  successFunction: () => {}
})

const emit = defineEmits<{
  (e: 'close', value: boolean): void
}>()

const isApproved = computed(() => props.comment.isApproved)

const title = computed(() => {
  return isApproved.value ? 'Скрыть комментарий?' : 'Опубликовать комментарий?'
})

const description = computed(() => {
  return isApproved.value ? 'Вы действительно хотите скрыть комментарий?' : 'Вы действительно хотите опубликовать комментарий?'
})

const reasonError = ref<string | undefined>()

const onResetReasonError = () => {
  if (!reasonError.value) return

  reasonError.value = undefined
}

const reason = ref('')

async function moderateComment() {
  if (isApproved.value && !reason.value) {
    reasonError.value = VALIDATION_ERRORS.REQUIRED

    return
  }

  await adminCommentsApi.moderate(props.comment.id, {
    isApproved: !isApproved.value,
    moderationReason: reason.value
  })

  props.successFunction()

  useSuccessNotification()

  emit('close', true)
}

const { runWithLoading: moderateCommentWrapped, isLoading } = useTryCatchWithLoading(moderateComment)
</script>

<template>
  <UiModalConfirm
    :title="title"
    :description="description"
    :confirm-btn-label="isApproved ? 'Скрыть' : 'Опубликовать'"
    :confirm-btn-loading="isLoading"
    :close-after-confirm="false"
    @confirm="moderateCommentWrapped"
    @close="emit('close', true)"
  >
    <PostCommentsItem
      :comment="comment"
      :can-action="false"
    />

    <UFormField
      v-if="isApproved"
      label="Причина скрытия"
      :error="reasonError"
      required
    >
      <UTextarea
        v-model="reason"
        placeholder="Введите причину скрытия комментария"
        @update:model-value="onResetReasonError()"
      />
    </UFormField>
  </UiModalConfirm>
</template>
