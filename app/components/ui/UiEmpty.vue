<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
}>(), {
  title: 'Нет данных'
})
</script>

<template>
  <UCard
    class="text-center min-h-62.5 w-full flex flex-col justify-center"
    :ui="{
      body: 'flex flex-col gap-2'
    }"
  >
    <span class="title-secondary">{{ title }}</span>

    <p
      v-if="description"
      class="text-dimmed"
      v-html="description"
    />
  </UCard>
</template>
