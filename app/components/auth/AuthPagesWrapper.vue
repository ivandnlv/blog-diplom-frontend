<script setup lang="ts">
import { SITEMAP } from '~/constants/app/sitemap.js'
import { ICONS_HERO } from '~/constants/icons/hero'
</script>

<template>
  <div class="min-h-svh">
    <UContainer class="flex relative flex-col gap-8 min-h-svh justify-center items-center">
      <UButton
        class="absolute left-4 top-4"
        :leading-icon="ICONS_HERO.ARROW_LEFT_16_SOLID"
        :to="SITEMAP.index.route"
        variant="link"
      >
        Вернуться на платформу
      </UButton>

      <slot />
    </UContainer>
  </div>
</template>
