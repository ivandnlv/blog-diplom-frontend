<script setup lang="ts">
import { authApi, type AuthApiType } from '~/api/auth'
import { object } from 'yup'
import { appValidator } from '~/helpers/validation'
import { useTryCatchWithLoading } from '~/composables/use-try-catch-with-loading'
import { redirectAfterAuthByRole } from '~/helpers/auth/redirect-after-auth-by-role'
import { SITEMAP } from '~/constants/app/sitemap'
import type { AuthType } from '~/components/auth/AuthModal.vue'

const props = withDefaults(defineProps<{
  switchMode?: 'route' | 'emit'
}>(), {
  switchMode: 'route'
})

const emit = defineEmits<{
  (e: 'switch', value: AuthType): void
  (e: 'success'): void
}>()

const serverErrorMessage = ref('')

const state = reactive<AuthApiType['Register']['Body']>({
  email: '',
  password: ''
})

const schema = object({
  email: appValidator.requiredEmail(),
  password: appValidator.requiredPassword()
})

const authStore = useAuthStore()
const { accessToken, user } = storeToRefs(authStore)

const { runWithLoading: register, isLoading: isRegisterLoading } = useTryCatchWithLoading(async () => {
  const { data } = await authApi.register(state)

  accessToken.value = data.accessToken
  authStore.setUser(data.user)

  await nextTick(async () => {
    if (!user.value) return

    await redirectAfterAuthByRole(user.value.role)

    emit('success')
  })
}, {
  catchCallback: message => serverErrorMessage.value = message ?? ''
})

const loginButtonAttrs = computed(() => {
  if (props.switchMode === 'route') {
    return {
      to: SITEMAP.auth.route
    }
  }

  return {
    onClick: () => emit('switch', 'login')
  }
})
</script>

<template>
  <UForm
    class="flex flex-col gap-4 max-w-[450px] w-full"
    :state="state"
    :schema="schema"
    @change="() => serverErrorMessage = ''"
    @submit.prevent="register()"
  >
    <UFormField
      label="Email"
      name="email"
      required
    >
      <UInput
        v-model="state.email"
        placeholder="Введите email"
      />
    </UFormField>

    <UFormField
      label="Пароль"
      name="password"
      required
    >
      <UiInputPassword
        v-model="state.password"
        placeholder="Введите пароль"
      />
    </UFormField>

    <span
      v-if="serverErrorMessage"
      class="text-(--ui-error) text-sm self-center"
    >
      {{ serverErrorMessage }}
    </span>

    <UButton
      type="submit"
      block
      :loading="isRegisterLoading"
    >
      Зарегистрироваться
    </UButton>

    <UButton
      variant="link"
      block
      v-bind="loginButtonAttrs"
    >
      Войти
    </UButton>
  </UForm>
</template>
