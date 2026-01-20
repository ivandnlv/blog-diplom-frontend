<script setup lang="ts">
import { useAdminLayoutStore } from '~/stores/admin/layout'
import { ICONS_HERO } from '~/constants/icons/hero'

const store = useAdminLayoutStore()
const { backRoute } = storeToRefs(store)
</script>

<template>
  <div class="flex relative flex-col min-h-svh">
    <header class="w-full h-(--admin-header-height) flex justify-end px-6 py-2">
      <LayoutUser
        :user-ui="{
          root: '!p-0'
        }"
      />
    </header>

    <div class="flex w-full h-full">
      <LayoutAdminSidebar
        class="fixed left-0 top-0 z-lower-max"
      />

      <main class="max-2xl:flex w-full relative ml-(--admin-sidebar-width) pt-(--admin-header-height) py-12 max-2xl:px-8">
        <UButton
          v-if="backRoute"
          class="2xl:absolute left-6 top-6 h-fit"
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
