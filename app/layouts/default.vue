<script setup lang="ts">
import { SITEMAP } from '~/constants/app/sitemap'

const { isLoggedIn, user } = storeToRefs(useAuthStore())
</script>

<template>
  <div>
    <main class="min-h-[calc(100svh_-_var(--default-footer-height))]">
      <UContainer class="w-full h-full">
        <slot />
      </UContainer>
    </main>

    <footer class="flex flex-col justify-center h-(--default-footer-height)">
      <UContainer class="flex w-full justify-end gap-4">
        <span
          v-if="isLoggedIn && user"
          class="flex gap-4"
        >
          Вы вошли как: <b>{{ user.email }}</b>
          <ULink :to="SITEMAP.authLogout.route">Выйти</ULink>
        </span>

        <span v-else>
          Вы администратор?
          <ULink :to="SITEMAP.auth.route">Войдите</ULink>
          в аккаунт, чтобы начать создавать статьи
        </span>
      </UContainer>
    </footer>
  </div>
</template>
