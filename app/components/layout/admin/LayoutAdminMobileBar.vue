<script setup lang="ts">
import { LAYOUT_ADMIN_ROUTES } from '~/constants/layout/admin/layout-admin-routes'
import type { SitemapRoute } from '~/types/app/router'

const route = useRoute()

function getIsItemActive(item: SitemapRoute) {
  return route.name?.toString().includes((item.route as any).name)
}
</script>

<template>
  <footer class="flex border-t bg-(--ui-bg)/80 backdrop-blur-md border-default w-full py-2 px-6 h-(--admin-mobile-footer-height)">
    <ul
      class="flex w-full gap-4 justify-around"
    >
      <li
        v-for="(item, i) in LAYOUT_ADMIN_ROUTES"
        :key="`route-${i}`"
      >
        <NuxtLink
          :to="item.route"
          class="flex flex-col justify-center gap-2 items-center transition-colors"
          :class="getIsItemActive(item) ? 'text-primary' : ''"
        >
          <UIcon
            v-if="item?.icon"
            :name="item.icon"
            class="min-w-5 size-5 text-inherit"
          />

          <span
            class="max-lg:text-sm font-bold transition-opacity whitespace-nowrap"
          >
            {{ item.name }}
          </span>
        </NuxtLink>
      </li>
    </ul>
  </footer>
</template>
