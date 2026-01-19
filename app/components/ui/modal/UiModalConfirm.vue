<script setup lang="ts">
import UiModalText from '~/components/ui/modal/UiModalText.vue'

withDefaults(defineProps<{
  title?: string
  description?: string
  confirmBtnLabel?: string
  cancelBtnLabel?: string
}>(), {
  title: 'Подтвердите действие',
  confirmBtnLabel: 'Принять',
  cancelBtnLabel: 'Отмена'
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
  emit('close', true)
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

      <div class="flex w-full gap-4">
        <UButton
          block
          color="secondary"
          :label="cancelBtnLabel"
          @click="onCancel()"
        />

        <UButton
          block
          :label="confirmBtnLabel"
          @click="onConfirm()"
        />
      </div>
    </template>
  </UModal>
</template>
