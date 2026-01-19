<script setup lang="ts">
import type { UserEntity } from '~/types/user'
import type { DropdownMenuItem } from '#ui/components/DropdownMenu.vue'
import { ICONS_HERO } from '~/constants/icons/hero'
import { SITEMAP } from '~/constants/app/sitemap'

defineProps<{
  user: UserEntity
}>()

const { isAdmin } = storeToRefs(useSessionStore())

const items = computed<DropdownMenuItem[][]>(() => {
  const sameItems = [
    {
      slot: 'colorMode'
    },
    {
      label: 'Выйти',
      icon: ICONS_HERO.ARROW_LEFT_ON_RECTANGLE_20_SOLID,
      to: SITEMAP.authLogout.route
    }
  ]

  return isAdmin.value
    ? [
        [
          {
            label: 'Админка',
            icon: ICONS_HERO.ARROW_RIGHT_END_ON_RECTANGLE_20_SOLID,
            to: SITEMAP.adminPosts.route
          }
        ],
        sameItems
      ]
    : [
        sameItems
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
    <UUser
      class="cursor-pointer transition-colors hover:bg-inverted p-1.5 rounded-sm"
      :name="user.username"
      :description="user.email"
      :avatar="{
        alt: user.username
      }"
      :ui="{
        avatar: 'text-inverted group-hover/user:scale-100'
      }"
    />

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
