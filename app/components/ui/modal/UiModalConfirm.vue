<script setup lang="ts">
import UiModalText from '~/components/ui/modal/UiModalText.vue'

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  confirmBtnLabel?: string
  cancelBtnLabel?: string
  confirmBtnLoading?: boolean
  closeAfterConfirm?: boolean
}>(), {
  title: 'Подтвердите действие',
  confirmBtnLabel: 'Принять',
  cancelBtnLabel: 'Отмена',
  confirmBtnLoading: false,
  closeAfterConfirm: true
})

const emit = defineEmits<{
  (e: 'confirm' | 'cancel'): void
  (e: 'close', value: boolean): void
}>()

const onCancel = () => {
  emit('close', true)
  emit('cancel')
}

const onConfirm = () => {
  emit('confirm')
  if (props.closeAfterConfirm) {
    emit('close', true)
  }
}
</script>

<template>
  <UModal
    :ui="{
      body: 'flex flex-col gap-8'
    }"
  >
    <template #body>
      <UiModalText
        :title="title"
        :description="description"
      />

      <slot />

      <div class="flex w-full gap-4">
        <UButton
          block
          color="secondary"
          :label="cancelBtnLabel"
          @click="onCancel()"
        />

        <UButton
          block
          :loading="confirmBtnLoading"
          :label="confirmBtnLabel"
          @click="onConfirm()"
        />
      </div>
    </template>
  </UModal>
</template>
