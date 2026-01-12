<script setup lang="ts">
import type { ImageUrlUploadBaseProps } from '~/types/ui/image-url-upload'

withDefaults(defineProps<ImageUrlUploadBaseProps & {
  title?: string
  description?: string
}>(), {
  title: 'Прикрепить изображение',
  description: 'Вставьте ссылку на изображение'
})

const model = defineModel<boolean>({
  default: false
})

const emit = defineEmits<{
  (e: 'close', value: boolean): void
}>()

const uploadModel = defineModel<string | undefined>('upload')

const onUpdateUpload = (value: string | undefined) => {
  uploadModel.value = value

  if (value) {
    emit('close', true)
  }
}
</script>

<template>
  <UModal
    v-model="model"
    :title="title"
    :description="description"
  >
    <template #body>
      <UiImageUrlUploadForm
        :model-value="uploadModel"
        @update:model-value="onUpdateUpload"
      />
    </template>
  </UModal>
</template>
