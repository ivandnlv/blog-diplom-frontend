<script setup lang="ts">
import { postsCommentsApi, type PostsCommentsApiType } from '~/api/posts-comments'
import { object } from 'yup'
import { appValidator } from '~/helpers/validation'

const props = defineProps<{
  postId: number
  parentId?: number
  buttonBlock?: boolean
}>()

const emit = defineEmits<{
  (e: 'success'): void
}>()

const formRef = useTemplateRef('form')

const sessionStore = useSessionStore()
const { savedUserData } = storeToRefs(sessionStore)

const state = reactive<PostsCommentsApiType['Post']['Body']>({
  authorEmail: savedUserData.value?.email,
  authorName: savedUserData.value?.name ?? '',
  content: '',
  parentId: props?.parentId ?? undefined
})

const schema = object({
  authorEmail: appValidator.isEmail(),
  authorName: appValidator.required(),
  content: appValidator.requiredMaxLength()
})

async function sendComment() {
  await postsCommentsApi.post(props.postId, state)

  sessionStore.setSavedUserData({
    email: state.authorEmail,
    name: state.authorName
  })

  useSuccessNotification('Комментарий отправлен!')

  emit('success')
}

const { runWithLoading: onSubmit, isLoading: isSubmitLoading } = useTryCatchWithLoading(sendComment)

const onClear = () => {
  state.authorEmail = savedUserData.value?.email
  state.authorName = savedUserData.value?.name ?? ''
  state.content = ''
  state.parentId = undefined

  formRef.value?.clear()
}
</script>

<template>
  <UForm
    ref="form"
    :validate-on="[]"
    :state="state"
    :schema="schema"
    class="flex flex-col gap-6"
    @submit.prevent="onSubmit"
  >
    <span v-if="savedUserData">
      В форме используются данные, которые вы оставили, написав прошлый свой комментарий, вы можете сбросить их, кликнув
      <button
        class="transition-colors text-primary cursor-pointer hover:text-white underline"
        @click="sessionStore.resetSavedUserData"
      >
        сюда
      </button>
    </span>

    <UFormField
      label="Имя"
      name="authorName"
      required
    >
      <UInput
        v-model="state.authorName"
        :disabled="!!savedUserData?.name"
        placeholder="Введите имя или псевдоним"
      />
    </UFormField>

    <UFormField
      label="Email"
      name="authorEmail"
    >
      <UInput
        v-model="state.authorEmail"
        :disabled="!!savedUserData?.email"
        placeholder="Введите ваш email (необязательно)"
      />
    </UFormField>

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
