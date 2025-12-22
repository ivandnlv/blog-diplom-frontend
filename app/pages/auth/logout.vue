<script setup lang="ts">
import { SITEMAP } from '~/constants/app/sitemap'

const { logout } = useAuthStore()

onMounted(async () => {
  logout()
  await navigateTo(SITEMAP.index.route)
})
</script>

<template>
  <div />
</template>
