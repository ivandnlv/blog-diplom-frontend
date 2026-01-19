<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <span
      v-if="title"
      class="font-semibold"
    >{{ title }}</span>

    <p v-if="description">
      {{ description }}
    </p>
  </div>
</template>
