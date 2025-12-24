<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { SITEMAP } from '~/constants/app/sitemap'

withDefaults(defineProps<{
  to?: RouteLocationRaw
}>(), {
  to: () => SITEMAP.index.route
})
</script>

<template>
  <NuxtLink
    class="text-white text-xl font-bold tracking-tighter flex items-center gap-2"
    :to="to"
  >
    DiplomBlog
  </NuxtLink>
</template>
