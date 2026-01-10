<script setup lang="ts">
import type { ComponentInstance } from 'vue'
import { LazyAuthLoginForm, LazyAuthRegisterForm } from '#components'

export type AuthType = 'login' | 'register'

withDefaults(defineProps<{
  title?: string
  description?: string
}>(), {
  title: 'Авторизация на платформе',
  description: 'Заполните форму, чтобы получить полный доступ к функционалу'
})

const currentMode = ref<AuthType>('login')

const onFormSwitch = (value: AuthType) => {
  if (value === currentMode.value) return

  currentMode.value = value
}

const componentsByMode: Record<AuthType, ComponentInstance<any>> = {
  login: LazyAuthLoginForm,
  register: LazyAuthRegisterForm
}
</script>

<template>
  <UModal
    :title="title"
    :description="description"
  >
    <template #body>
      <component
        :is="componentsByMode[currentMode]"
        switch-mode="emit"
        @switch="onFormSwitch"
      />
    </template>
  </UModal>
</template>
