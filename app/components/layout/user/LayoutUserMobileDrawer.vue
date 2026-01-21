<script setup lang="ts">
import { SITEMAP } from '~/constants/app/sitemap'
import { APP_ADMIN_INDEX_ROUTE, APP_INDEX_ROUTE } from '~/constants/app'
import { ICONS_HERO } from '~/constants/icons/hero'

const model = defineModel<boolean>('open', { default: false })

const route = useRoute()
const isAdminRoute = computed(() => route.name?.toString().includes('admin'))

const { isAdmin } = storeToRefs(useSessionStore())

const colorMode = useColorMode()

const onItemClick = () => {
  model.value = false
}
</script>

<template>
  <UDrawer
    v-model:open="model"
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
          :icon="ICONS_HERO.ARROW_LEFT_16_SOLID"
          color="secondary"
          block
          @click="onItemClick()"
        >
          Перейти в платформу
        </UButton>

        <UButton
          v-else
          :to="APP_ADMIN_INDEX_ROUTE.route"
          color="secondary"
          :icon="ICONS_HERO.ARROW_RIGHT_END_ON_RECTANGLE_20_SOLID"
          block
          @click="onItemClick()"
        >
          Перейти в админку
        </UButton>
      </template>

      <UButton
        color="secondary"
        block
        :to="SITEMAP.myProfile.route"
        :icon="ICONS_HERO.USER_20_SOLID"
        @click="onItemClick()"
      >
        Профиль
      </UButton>

      <UButton
        color="secondary"
        block
        :to="SITEMAP.authLogout.route"
        :icon="ICONS_HERO.ARROW_LEFT_ON_RECTANGLE_20_SOLID"
        @click="onItemClick()"
      >
        Выйти
      </UButton>
    </template>
  </UDrawer>
</template>
