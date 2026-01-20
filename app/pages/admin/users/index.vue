<script setup lang="ts">
import { SITEMAP } from '~/constants/app/sitemap'

definePageMeta({
  layout: 'admin'
})
</script>

<template>
  <AdminUiPageContainer>
    <h1 class="title-main">
      {{ SITEMAP.adminUsers.name }}
    </h1>
  </AdminUiPageContainer>
</template>
