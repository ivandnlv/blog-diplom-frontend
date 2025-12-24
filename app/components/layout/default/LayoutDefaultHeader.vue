<script setup lang="ts">
import { SITEMAP } from '~/constants/app/sitemap'

const { isLoggedIn, user } = storeToRefs(useAuthStore())
</script>

<template>
  <header class="w-full z-50 border-b border-zinc-800 bg-[#0f0f10]/80 backdrop-blur-md">
    <UContainer class="flex w-full h-(--default-header-height) justify-between items-center">
      <UiLogo />

      <div class="flex">
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
      </div>
    </UContainer>
  </header>
</template>
