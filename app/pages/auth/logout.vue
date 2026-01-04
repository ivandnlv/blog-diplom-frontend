<script setup lang="ts">
import { SITEMAP } from '~/constants/app/sitemap'

const { logout } = useAuthStore()

onMounted(async () => {
  logout(false)
  await navigateTo(SITEMAP.index.route)
})
</script>

<template>
  <div />
</template>
