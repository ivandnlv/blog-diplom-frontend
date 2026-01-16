<script setup lang="ts">
import type { SitemapRoute } from '~/types/app/router'
import { SITEMAP } from '~/constants/app/sitemap'
import { ICONS_HERO } from '~/constants/icons/hero'

const routes: SitemapRoute[] = [
  SITEMAP.adminPosts
]

const [isCollapsed, toggleCollapsed] = useToggle(true)
</script>

<template>
  <aside
    class="flex flex-col gap-12 h-full bg-muted dark:bg-zinc-950 border-r border-default dark:border-zinc-800 py-6 px-4 max-w-[var(--admin-sidebar-width)] overflow-hidden transition-[max-width]"
    :class="{
      '!max-w-[450px]': !isCollapsed
    }"
    @mousemove="toggleCollapsed(false)"
    @mouseleave="toggleCollapsed(true)"
  >
    <UiLogo
      :collapsed="isCollapsed"
    />

    <nav>
      <ul>
        <li
          v-for="(item, i) in routes"
          :key="`route-${i}`"
        >
          <NuxtLink
            :to="item.route"
            class="flex gap-2 items-center [.router-link-active]:text-primary transition-colors hover:text-primary-500"
          >
            <UIcon
              v-if="item?.icon"
              :name="item.icon"
              class="min-w-5 size-5 text-inherit"
            />

            <span
              class="font-bold transition-opacity"
              :class="isCollapsed ? 'opacity-0' : 'opacity-100'"
            >
              {{ item.name }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <UColorModeSwitch
      v-if="!isCollapsed"
    />

    <NuxtLink
      class="flex cursor-pointer hover:text-primary mt-auto gap-2 items-center transition-opacity duration-1000 whitespace-nowrap"
      :to="SITEMAP.index.route"
    >
      <UIcon
        :name="ICONS_HERO.ARROW_LEFT_16_SOLID"
        class="min-w-5 size-5 color-inherit transition-colors"
      />

      <span
        class="transition-colors"
        :class="isCollapsed ? 'opacity-0' : 'opacity-100'"
      >Вернуться на платформу</span>
    </NuxtLink>
  </aside>
</template>
