<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { APP_INDEX_ROUTE } from '~/constants/app'

withDefaults(defineProps<{
  to?: RouteLocationRaw
  collapsed?: boolean
}>(), {
  to: () => APP_INDEX_ROUTE.route
})
</script>

<template>
  <NuxtLink
    class="text-white text-xl font-bold tracking-tighter flex items-center gap-2"
    :to="to"
  >
    {{ collapsed ? 'DB' : 'DiplomBlog' }}
  </NuxtLink>
</template>
