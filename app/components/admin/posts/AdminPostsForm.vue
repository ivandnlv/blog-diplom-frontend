<script setup lang="ts">
import type { AdminPostsBody } from '~/types/admin/posts'
import { object } from 'yup'
import { appValidator } from '~/helpers/validation'
import type { PostEntity } from '~/types/post'
import { adminPostsApi } from '~/api/admin-posts'

const props = defineProps<{
  post?: PostEntity
}>()

const state = reactive<AdminPostsBody>({
  title: props.post?.title || '',
  content: props.post?.content || '',
  published: props.post?.published || undefined,
  contentImagesUrls: undefined,
  thumbnailUrl: props.post?.thumbnailUrl
})

const schema = object({
  title: appValidator.required(),
  content: appValidator.required()
})

const emit = defineEmits<{
  (e: 'success', post: PostEntity): void
}>()

async function createPost() {
  const { data } = await adminPostsApi.post(state)

  emit('success', data)

  useSuccessNotification()
}

async function updatePost() {
  if (!props.post?.id) return

  const { data } = await adminPostsApi.patch(props.post.id, state)

  emit('success', data)

  useSuccessNotification()
}

const { runWithLoading: onSubmit, isLoading: isSubmitting } = useTryCatchWithLoading(() => props.post ? updatePost() : createPost())
</script>

<template>
  <UForm
    class="flex flex-col gap-8"
    :state="state"
    :schema="schema"
    @submit.prevent="onSubmit"
  >
    <UFormField
      name="thumbnailUrl"
      label="Обложка"
      :ui="{
        root: 'flex flex-col gap-2'
      }"
    >
      <UiImageUrlUpload
        v-model="state.thumbnailUrl"
        image-ui="max-h-[200px]"
      />
    </UFormField>

    <UFormField
      name="title"
      label="Заголовок"
      required
    >
      <UInput
        v-model="state.title"
        placeholder="Введите заголовок"
      />
    </UFormField>

    <UFormField
      name="content"
      label="Контент"
      required
    >
      <AdminUiEditor
        v-model="state.content"
        @update:images="(images) => state.contentImagesUrls = images"
      />
    </UFormField>

    <UButton
      type="submit"
      block
      :loading="isSubmitting"
    >
      {{ post ? 'Сохранить' : 'Создать' }}
    </UButton>
  </UForm>
</template>
