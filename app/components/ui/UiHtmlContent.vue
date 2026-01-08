<script setup lang="ts">
defineProps<{
  content: string
}>()
</script>

<template>
  <div
    class="ui-html-content"
    v-html="content"
  />
</template>

<style lang="scss" scoped>
.ui-html-content {
  h2 {

  }
}
</style>
