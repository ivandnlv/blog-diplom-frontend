<script setup lang="ts">
import type { DropdownMenuItem } from '#ui/components/DropdownMenu.vue'
import { ICONS_HERO } from '~/constants/icons/hero'
import { SITEMAP } from '~/constants/app/sitemap'
import type { UserProps } from '#ui/components/User.vue'

const props = defineProps<{
  userUi?: UserProps['ui']
  collapsed?: boolean
}>()

const route = useRoute()

const isAdminRoute = computed(() => route.name?.toString().includes('admin'))

const { user } = storeToRefs(useAuthStore())
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

const mergedUserUi = computed(() => {
  if (!props.userUi) return {
    avatar: 'text-inverted group-hover/user:scale-100'
  }

  return {
    ...props.userUi,
    avatar: 'avatar' in props.userUi ? [props.userUi.avatar, 'text-inverted group-hover/user:scale-100'].join(' ') : 'text-inverted group-hover/user:scale-100'
  }
})
</script>

<template>
  <UDropdownMenu
    v-if="user"
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
      :ui="mergedUserUi"
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
