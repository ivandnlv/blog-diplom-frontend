<script setup lang="ts">
import type { ImageUrlUploadBaseProps } from '~/types/ui/image-url-upload'
import { object } from 'yup'
import { appValidator } from '~/helpers/validation'

withDefaults(defineProps<ImageUrlUploadBaseProps>(), {
  inputPlaceholder: 'Вставьте ссылку на изображение'
})

const state = reactive<{
  url: string | undefined
}>({
  url: undefined
})

const schema = object({
  url: appValidator.requiredUrl()
})

const model = defineModel<string | undefined>()

const error = ref<string | undefined>()

const onSetError = () => error.value = 'Ссылка не содержит файл'
const onResetError = () => {
  if (error.value) error.value = undefined
}

async function getFileFromUrl() {
  const response = await $fetch<unknown>(`/api/media/${state.url}`, { method: 'GET' })

  if (response && typeof response === 'object' && 'type' in response && typeof response.type === 'string' && response.type.includes('image')) {
    model.value = state.url

    return
  }

  onSetError()
}

const { runWithLoading: getFileFromUrlWithLoading, isLoading } = useTryCatchWithLoading(getFileFromUrl, {
  catchCallback: onSetError
})
</script>

<template>
  <UForm
    :state="state"
    :schema="schema"
    class="flex flex-col gap-8"
    @submit.prevent="getFileFromUrlWithLoading()"
  >
    <UFormField
      name="url"
      :error="error"
    >
      <UInput
        v-model="state.url"
        :placeholder="inputPlaceholder"
        @update:model-value="onResetError"
      />
    </UFormField>

    <UButton
      block
      :loading="isLoading"
      type="submit"
    >
      Прикрепить
    </UButton>
  </UForm>
</template>
