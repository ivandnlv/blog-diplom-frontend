<script setup lang="ts">
import { SITEMAP } from '~/constants/app/sitemap'

definePageMeta({
  layout: false,
  middleware: 'only-unauthorized'
})
</script>

<template>
  <AuthPagesWrapper>
    <h1 class="title-main">
      {{ SITEMAP.authRegister.name }}
    </h1>

    <AuthRegisterForm />
  </AuthPagesWrapper>
</template>
