<script setup lang="ts">
import type { NuxtError } from '#app'
import { APP_INDEX_ROUTE } from '~/constants/app'

defineProps<{ error: NuxtError }>()
</script>

<template>
  <div class="min-h-svh flex flex-col gap-6 justify-center items-center text-center">
    <NuxtImg
      class="w-32"
      src="/images/404.webp"
    />

    <h1 class="title-secondary">
      Такой страницы<br> не существует
    </h1>

    <UButton
      :to="APP_INDEX_ROUTE.route"
    >
      Вернуться на главную
    </UButton>
  </div>
</template>
