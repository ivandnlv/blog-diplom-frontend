<script setup lang="ts">
import type { PostCommentEntity } from '~/types/post-comment'
import { formatISOToDateWithConditions } from '~/helpers/format/date'
import { LazyPostCommentsFormModal } from '#components'
import { useAuthRequiredCallbackWrapper } from '~/composables/use-auth-required-callback-wrapper'
import { useAuthStore } from '~/stores/auth'
import { COMMENTS_MAX_LEVEL } from '~/constants/comments/comments-max-level'

const props = withDefaults(defineProps<{
  comment: PostCommentEntity
  level?: number
  canAction?: boolean
}>(), {
  level: 0,
  canAction: true
})

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const [isShowAnswers, toggleShowAnswers] = useToggle()

const isByCurrentUser = computed(() => props.comment.author?.id === user.value?.id)

const isCanAnswer = computed(() => !isByCurrentUser.value && props.level < COMMENTS_MAX_LEVEL)

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
    comment: props.comment,
    successFunction: onModalAnswered
  }
})

const name = computed(() => {
  return props.comment.author?.email ?? ''
})

const onOpenAnswerModal = () => {
  answerModal.open()

  if (!isShowAnswers.value) toggleShowAnswers(true)
}

const onAnswer = useAuthRequiredCallbackWrapper(onOpenAnswerModal, {
  description: 'Чтобы оставить комментарий, вам необходимо авторизоваться'
})
</script>

<template>
  <UCard
    :style="level && comment?.parentId ? `marginLeft: ${level * 24}px` : ''"
    :ui="{
      root: isByCurrentUser ? 'light:bg-primary-100 dark:bg-primary-950' : '',
      body: 'flex flex-col gap-2'
    }"
  >
    <div class="flex items-center gap-2">
      <UAvatar
        :alt="name"
      />

      <span class="text-default">
        {{ name }}
        <span
          v-if="isByCurrentUser"
          class="!text-primary"
        >(Вы)</span>
      </span>

      <span class="text-muted ml-auto">
        {{ createdFormatted }}
      </span>
    </div>

    <p class="text-default">
      {{ comment.content }}
    </p>

    <div
      v-if="canAction"
      class="flex w-full items-end justify-between gap-4"
    >
      <button
        v-if="comment?.childrenCount"
        class="cursor-pointer transition-colors text-sm font-medium text-default hover:text-primary"
        @click="toggleShowAnswers()"
      >
        {{ isShowAnswers ? 'Скрыть ответы' : 'Показать ответы' }}
      </button>

      <UButton
        v-if="isCanAnswer"
        class="w-fit ml-auto"
        color="secondary"
        @click="onAnswer()"
      >
        Ответить
      </UButton>
    </div>
  </UCard>

  <PostComments
    v-if="isShowAnswers && canAction"
    ref="postComments"
    :post-id="comment.postId"
    :parent-id="comment.id"
    :show-title="false"
    :show-form="false"
    :level="level + 1"
  />
</template>
