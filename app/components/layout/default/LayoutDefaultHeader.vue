<script setup lang="ts">
import { SITEMAP } from '~/constants/app/sitemap'

const { isLoggedIn } = storeToRefs(useAuthStore())
</script>

<template>
  <header class="w-full z-50 border-b border-default bg-(--ui-bg)/80 backdrop-blur-md">
    <UContainer class="flex w-full h-(--default-header-height) justify-between items-center">
      <div class="flex gap-4 items-center">
        <UiLogo />

        <span class="max-lg:hidden text-dimmed text-xs">Блог о разработке</span>
      </div>

      <div class="flex gap-6 items-center">
        <LayoutUser v-if="isLoggedIn" />

        <template v-else>
          <UColorModeButton />

          <div
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
        </template>
      </div>
    </UContainer>
  </header>
</template>
