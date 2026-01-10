<script setup lang="ts">
import { postsCommentsApi, type PostsCommentsApiType } from '~/api/posts-comments'
import { object } from 'yup'
import { appValidator } from '~/helpers/validation'
import { useAuthRequiredCallbackWrapper } from '~/composables/use-auth-required-callback-wrapper'

const props = defineProps<{
  postId: number
  parentId?: number
  buttonBlock?: boolean
}>()

const emit = defineEmits<{
  (e: 'success'): void
}>()

const formRef = useTemplateRef('form')

const state = reactive<PostsCommentsApiType['Post']['Body']>({
  content: '',
  parentId: props?.parentId ?? undefined
})

const schema = object({
  content: appValidator.requiredMaxLength()
})

async function sendComment() {
  await postsCommentsApi.post(props.postId, state)

  useSuccessNotification('Комментарий отправлен!')

  emit('success')
}

const { runWithLoading: onSubmit, isLoading: isSubmitLoading } = useTryCatchWithLoading(sendComment)

const onClear = () => {
  state.content = ''
  state.parentId = undefined

  formRef.value?.clear()
}

const onSubmitWrapped = useAuthRequiredCallbackWrapper(onSubmit)
</script>

<template>
  <UForm
    ref="form"
    :validate-on="[]"
    :state="state"
    :schema="schema"
    class="flex flex-col gap-6"
    @submit.prevent="onSubmitWrapped"
  >
    <UFormField
      label="Комментарий"
      name="content"
      required
    >
      <UTextarea
        v-model="state.content"
        placeholder="Введите текст комментария"
      />
    </UFormField>

    <div class="flex gap-2">
      <UButton
        type="reset"
        color="secondary"
        :block="buttonBlock"
        @click="onClear"
      >
        Очистить
      </UButton>

      <UButton
        type="submit"
        :block="buttonBlock"
        :loading="isSubmitLoading"
      >
        Отправить
      </UButton>
    </div>
  </UForm>
</template>
