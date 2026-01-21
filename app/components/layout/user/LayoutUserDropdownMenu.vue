<script setup lang="ts">
import type { DropdownMenuItem } from '#ui/components/DropdownMenu.vue'
import { ICONS_HERO } from '~/constants/icons/hero'
import { SITEMAP } from '~/constants/app/sitemap'

const route = useRoute()
const isAdminRoute = computed(() => route.name?.toString().includes('admin'))

const { isAdmin } = storeToRefs(useSessionStore())

const items = computed<DropdownMenuItem[][]>(() => {
  const baseItems = [
    {
      slot: 'colorMode'
    },
    {
      label: 'Выйти',
      icon: ICONS_HERO.ARROW_LEFT_ON_RECTANGLE_20_SOLID,
      to: SITEMAP.authLogout.route
    }
  ]

  if (!isAdmin.value) return [baseItems]

  return isAdmin.value && !isAdminRoute.value
    ? [
        [
          {
            label: 'Админка',
            icon: ICONS_HERO.ARROW_RIGHT_END_ON_RECTANGLE_20_SOLID,
            to: SITEMAP.adminPosts.route
          }
        ],
        baseItems
      ]
    : [
        [
          {
            label: 'Платформа',
            icon: ICONS_HERO.ARROW_LEFT_16_SOLID,
            to: SITEMAP.index.route
          }
        ],
        baseItems
      ]
})

const colorMode = useColorMode()
</script>

<template>
  <UDropdownMenu
    mode="hover"
    :items="items"
    :ui="{
      itemLabel: 'text-inherit'
    }"
  >
    <slot />

    <template #colorMode>
      <UColorModeButton
        :label="colorMode.value === 'dark' ? 'Темная тема' : 'Светлая тема'"
        :ui="{
          base: 'shadow-none p-0 text-dimmed hover:text-default w-full hover:bg-transparent'
        }"
      />
    </template>
  </UDropdownMenu>
</template>
