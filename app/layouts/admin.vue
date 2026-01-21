<script setup lang="ts">
import { useAdminLayoutStore } from '~/stores/admin/layout'
import { ICONS_HERO } from '~/constants/icons/hero'

const store = useAdminLayoutStore()
const { backRoute } = storeToRefs(store)
</script>

<template>
  <div class="relative min-h-svh">
    <LayoutAdminHeader class="max-lg:fixed top-0 left-0 max-lg:z-lower-max" />

    <div class="flex w-full h-full">
      <LayoutAdminSidebar
        class="max-lg:hidden fixed left-0 top-0 z-lower-max"
      />

      <main class="max-2xl:flex w-full h-full relative lg:ml-(--admin-sidebar-width) max-lg:pt-[calc(var(--admin-header-height)_+_24px)] lg:pt-(--admin-header-height) max-lg:pb-(--admin-mobile-footer-height) py-12 lg:max-2xl:px-8">
        <UButton
          v-if="backRoute"
          class="max-lg:hidden 2xl:absolute left-6 top-6 h-fit"
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

    <LayoutAdminMobileBar
      class="lg:hidden fixed bottom-0 left-0"
    />
  </div>
</template>
