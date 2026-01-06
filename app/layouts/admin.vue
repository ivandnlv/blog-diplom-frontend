<script setup lang="ts">
import { useAdminLayoutStore } from '~/stores/admin/layout'
import { ICONS_HERO } from '~/constants/icons/hero'

const store = useAdminLayoutStore()
const { backRoute } = storeToRefs(store)
</script>

<template>
  <div class="flex relative flex-col min-h-svh">
    <div class="flex w-full h-full">
      <LayoutAdminSidebar
        class="fixed left-0 top-0 z-lower-max"
      />

      <main class="w-full relative ml-[var(--admin-sidebar-width)] py-12">
        <UButton
          v-if="backRoute"
          class="absolute left-6 top-6"
          color="secondary"
          :icon="ICONS_HERO.ARROW_LEFT_16_SOLID"
          :to="backRoute"
        >
          Назад
        </UButton>

        <UContainer>
          <slot />
        </UContainer>
      </main>
    </div>
  </div>
</template>
