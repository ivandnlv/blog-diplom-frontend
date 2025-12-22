<script setup lang="ts">
withDefaults(defineProps<{
  limit?: number
}>(), {
  limit: 11
})
</script>

<template>
  <div class="flex flex-col gap-3 w-full">
    <u-skeleton
      v-for="i in limit"
      :key="`ui-table-skeleton-${i}`"
      class="w-full h-[52px] rounded-lg"
    />
  </div>
</template>
