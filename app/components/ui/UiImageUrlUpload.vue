<script setup lang="ts">
import type { ImageUrlUploadBaseProps } from '~/types/ui/image-url-upload'
import { LazyUiModalImageUrlUpload } from '#components'
import { ICONS_HERO } from '~/constants/icons/hero'

const props = withDefaults(defineProps<ImageUrlUploadBaseProps & {
  baseUi?: string
  imageUi?: string
}>(), {
  baseUi: '',
  imageUi: ''
})

const model = defineModel<string | undefined>()

const overlay = useOverlay()
const modal = overlay.create(LazyUiModalImageUrlUpload, {
  props: {
    'inputPlaceholder': props.inputPlaceholder,
    'upload': model.value,
    'onUpdate:upload': value => model.value = value
  }
})

const onModalOpen = () => {
  modal.patch({
    upload: model.value
  })

  modal.open()
}
</script>

<template>
  <div
    :class="['flex flex-col w-fit relative rounded-2xl overflow-hidden', baseUi]"
  >
    <button
      v-if="model"
      class="cursor-pointer flex flex-col justify-center items-center absolute size-full top-0 left-0 opacity-0 hover:opacity-100 transition-opacity bg-gray-950/60"
      @click="model = undefined"
    >
      <UIcon
        class="size-6 light:text-inverted"
        :name="ICONS_HERO.TRASH_16_SOLID"
      />
    </button>

    <NuxtImg
      v-if="model"
      :class="imageUi"
      :src="model"
      loading="lazy"
    />

    <UButton
      v-else
      color="secondary"
      @click="onModalOpen()"
    >
      Прикрепить изображение
    </UButton>
  </div>
</template>
