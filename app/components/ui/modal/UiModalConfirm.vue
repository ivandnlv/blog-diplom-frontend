<script setup lang="ts">
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
</script>

<template>
  <UModal
    :title="title"
    :description="description"
    :ui="{
      body: 'flex flex-col gap-8'
    }"
  >
    <template #body>
      <p
        v-if="description"
        v-html="description"
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
          @click="emit('confirm')"
        />
      </div>
    </template>
  </UModal>
</template>
