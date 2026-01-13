<script setup lang="ts">
import { SITEMAP } from '~/constants/app/sitemap'
import { useSessionStore } from '~/stores/session'

const { isLoggedIn, user } = storeToRefs(useAuthStore())

const { isAdmin } = storeToRefs(useSessionStore())
</script>

<template>
  <header class="w-full z-50 border-b border-zinc-800 bg-[#0f0f10]/80 backdrop-blur-md">
    <UContainer class="flex w-full h-(--default-header-height) justify-between items-center">
      <UiLogo />

      <div class="flex">
        <div
          v-if="isLoggedIn && user"
          class="flex gap-4 items-center"
        >
          <span class="max-sm:hidden">Вы вошли как: <b>{{ user.email }}</b></span>

          <UButton
            :to="SITEMAP.authLogout.route"
            color="secondary"
          >
            Выйти
          </UButton>

          <UButton
            v-if="isAdmin"
            :to="SITEMAP.adminPosts.route"
          >
            Перейти в админку
          </UButton>
        </div>

        <div
          v-else
          class="flex gap-4 items-center"
        >
          <UButton
            :to="SITEMAP.auth.route"
          >
            Войти
          </UButton>

          <UButton
            color="secondary"
            :to="SITEMAP.authRegister.route"
          >
            Зарегистрироваться
          </UButton>
        </div>
      </div>
    </UContainer>
  </header>
</template>
