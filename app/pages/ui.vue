<script setup lang="ts">
import type { ButtonProps } from '#ui/components/Button.vue'

const buttonsArr: {
  name: string
  color: ButtonProps['color']
}[] = [
  {
    name: 'Primary',
    color: 'primary'
  },
  {
    name: 'Secondary',
    color: 'secondary'
  },
  {
    name: 'Success',
    color: 'success'
  },
  {
    name: 'Error',
    color: 'error'
  }
]
</script>

<template>
  <div class="flex flex-col gap-8 min-h-svh">
    <h1 class="title-main">
      Ui-kit
    </h1>

    <span class="title-secondary">Buttons</span>

    <div
      v-for="(button, i) in buttonsArr"
      :key="`button-${i}`"
      class="flex gap-4 items-center"
    >
      <UButton :color="button.color">
        {{ button.name }}
      </UButton>

      <UButton
        :color="button.color"
        :disabled="true"
      >
        {{ button.name }} (disabled)
      </UButton>
    </div>

    <span class="title-secondary">Inputs</span>

    <div class="flex gap-4 items-start">
      <UFormField label="Label">
        <UInput placeholder="Placeholder..." />
      </UFormField>

      <UFormField
        label="Label"
        error="Error"
      >
        <UInput placeholder="Placeholder..." />
      </UFormField>

      <UFormField
        label="Label (disabled)"
      >
        <UInput
          disabled
          placeholder="Placeholder..."
        />
      </UFormField>
    </div>
  </div>
</template>
