<script setup lang="ts">
import type { ComponentInstance } from 'vue'
import { LazyAuthLoginForm, LazyAuthRegisterForm } from '#components'

export interface AuthModalProps {
  title?: string
  description?: string
}

export type AuthType = 'login' | 'register'

withDefaults(defineProps<AuthModalProps>(), {
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
    <template #body="{ close }">
      <component
        :is="componentsByMode[currentMode]"
        switch-mode="emit"
        @switch="onFormSwitch"
        @success="close"
      />
    </template>
  </UModal>
</template>
