<script setup lang="ts">
import { SITEMAP } from '~/constants/app/sitemap'
import { APP_ADMIN_INDEX_ROUTE, APP_INDEX_ROUTE } from '~/constants/app'

const route = useRoute()
const isAdminRoute = computed(() => route.name?.toString().includes('admin'))

const { isAdmin } = storeToRefs(useSessionStore())

const colorMode = useColorMode()
</script>

<template>
  <UDrawer
    :ui="{
      body: 'flex flex-col gap-2'
    }"
  >
    <slot />

    <template #body>
      <UColorModeButton
        :label="colorMode.value === 'dark' ? 'Темная тема' : 'Светлая тема'"
        :ui="{
          base: 'shadow-none p-0 text-dimmed hover:text-default w-full hover:bg-transparent'
        }"
        class="h-10"
        block
      />

      <template v-if="isAdmin">
        <UButton
          v-if="isAdminRoute"
          :to="APP_INDEX_ROUTE.route"
          color="secondary"
          block
        >
          Перейти в платформу
        </UButton>

        <UButton
          v-else
          :to="APP_ADMIN_INDEX_ROUTE.route"
          color="secondary"
          block
        >
          Перейти в админку
        </UButton>
      </template>

      <UButton
        color="secondary"
        block
        :to="SITEMAP.authLogout.route"
      >
        Выйти
      </UButton>
    </template>
  </UDrawer>
</template>
