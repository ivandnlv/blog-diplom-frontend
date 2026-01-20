<script setup lang="ts">
import type { SitemapRoute } from '~/types/app/router'
import { SITEMAP } from '~/constants/app/sitemap'
import { APP_ADMIN_INDEX_ROUTE } from '~/constants/app'

const routes: SitemapRoute[] = [
  SITEMAP.adminUsers,
  SITEMAP.adminPosts,
  SITEMAP.adminComments
]

const [isCollapsed, toggleCollapsed] = useToggle(true)

const route = useRoute()

function getIsItemActive(item: SitemapRoute) {
  return route.name?.toString().includes((item.route as any).name)
}
</script>

<template>
  <aside
    class="flex flex-col gap-24 h-full bg-muted dark:bg-zinc-950 border-r border-default dark:border-zinc-800 py-6 px-4 max-w-[var(--admin-sidebar-width)] overflow-hidden transition-[max-width]"
    :class="{
      '!max-w-[450px]': !isCollapsed
    }"
    @mousemove="toggleCollapsed(false)"
    @mouseleave="toggleCollapsed(true)"
  >
    <UiLogo
      :collapsed="isCollapsed"
      :to="APP_ADMIN_INDEX_ROUTE.route"
    />

    <nav>
      <ul
        class="flex flex-col gap-8"
      >
        <li
          v-for="(item, i) in routes"
          :key="`route-${i}`"
        >
          <NuxtLink
            :to="item.route"
            class="flex gap-2 items-center transition-colors hover:text-primary-500"
            :class="getIsItemActive(item) ? 'text-primary' : ''"
          >
            <UIcon
              v-if="item?.icon"
              :name="item.icon"
              class="min-w-5 size-5 text-inherit"
            />

            <span
              class="font-bold transition-opacity whitespace-nowrap"
              :class="isCollapsed ? 'opacity-0' : 'opacity-100'"
            >
              {{ item.name }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>
