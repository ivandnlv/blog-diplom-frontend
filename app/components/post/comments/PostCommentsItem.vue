<script setup lang="ts">
import type { PostCommentEntity } from '~/types/post-comment'
import { formatISOToDateWithConditions } from '~/helpers/format/date'
import { LazyPostCommentsFormModal } from '#components'
import { useAuthRequiredCallbackWrapper } from '~/composables/use-auth-required-callback-wrapper'
import { useAuthStore } from '~/stores/auth'

const props = withDefaults(defineProps<{
  comment: PostCommentEntity
  level?: number
}>(), {
  level: 0
})

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const [isShowAnswers, toggleShowAnswers] = useToggle()

const emit = defineEmits<{
  (e: 'answered'): void
}>()

const commentsRef = useTemplateRef('postComments')

const onModalAnswered = () => {
  emit('answered')

  if (!isShowAnswers.value || !commentsRef.value) return

  commentsRef.value.refresh()
}

const createdFormatted = computed(() => formatISOToDateWithConditions(props.comment.createdAt))

const overlay = useOverlay()

const answerModal = overlay.create(LazyPostCommentsFormModal, {
  props: {
    postId: props.comment.postId,
    parentId: props.comment.id,
    successFunction: onModalAnswered
  }
})

const name = computed(() => {
  return props.comment.author?.email ?? ''
})

const onAnswer = useAuthRequiredCallbackWrapper(() => answerModal.open(), {
  description: 'Чтобы оставить комментарий, вам необходимо авторизоваться'
})
</script>

<template>
  <UCard
    :style="level && comment?.parentId ? `marginLeft: ${level * 24}px` : ''"
    :ui="{
      body: 'flex flex-col gap-2'
    }"
  >
    <div class="flex items-center gap-2">
      <UAvatar
        :alt="name"
      />

      <span class="text-default">{{ name }}</span>

      <span class="text-muted ml-auto">
        {{ createdFormatted }}
      </span>
    </div>

    <p class="text-default">
      {{ comment.content }}
    </p>

    <div class="flex w-full items-end justify-between gap-4">
      <button
        v-if="comment?.childrenCount"
        class="cursor-pointer transition-colors text-sm font-medium text-default hover:text-primary"
        @click="toggleShowAnswers()"
      >
        {{ isShowAnswers ? 'Скрыть ответы' : 'Показать ответы' }}
      </button>

      <UButton
        v-if="comment.author?.id !== user?.id"
        class="w-fit ml-auto"
        color="secondary"
        @click="onAnswer()"
      >
        Ответить
      </UButton>
    </div>
  </UCard>

  <PostComments
    v-if="isShowAnswers"
    ref="postComments"
    :post-id="comment.postId"
    :parent-id="comment.id"
    :show-title="false"
    :show-form="false"
    :level="level + 1"
  />
</template>
