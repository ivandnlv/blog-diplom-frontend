<script setup lang="ts">
import { APP_ADMIN_INDEX_ROUTE } from '~/constants/app'
import { useAdminLayoutStore } from '~/stores/admin/layout'
import { ICONS_HERO } from '~/constants/icons/hero'

const store = useAdminLayoutStore()
const { backRoute } = storeToRefs(store)
</script>

<template>
  <header class="w-full max-lg:border-b border-default h-(--admin-header-height) flex max-lg:items-center justify-between lg:justify-end px-6 py-2">
    <div class="flex gap-4">
      <UButton
        v-if="backRoute"
        size="xs"
        class="lg:hidden"
        color="secondary"
        :icon="ICONS_HERO.ARROW_LEFT_16_SOLID"
        :to="backRoute"
      >
        Назад
      </UButton>

      <UiLogo
        class="lg:hidden"
        :to="APP_ADMIN_INDEX_ROUTE.route"
      />
    </div>

    <LayoutUser
      :user-ui="{
        root: '!p-0'
      }"
    />
  </header>
</template>
