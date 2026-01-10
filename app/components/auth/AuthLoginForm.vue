<script setup lang="ts">
import { SITEMAP } from '~/constants/app/sitemap'
import { object } from 'yup'
import { authApi, type AuthApiType } from '~/api/auth'
import { appValidator } from '~/helpers/validation'
import { redirectAfterAuthByRole } from '~/helpers/auth/redirect-after-auth-by-role'
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

const state = reactive<AuthApiType['Login']['Body']>({
  email: '',
  password: ''
})

const schema = object({
  email: appValidator.requiredEmail(),
  password: appValidator.requiredPassword()
})

const authStore = useAuthStore()
const { accessToken, user } = storeToRefs(authStore)

const { runWithLoading: login, isLoading: isLoggingIn } = useTryCatchWithLoading(async () => {
  const { data } = await authApi.login(state)

  accessToken.value = data.accessToken

  await authStore.fetchMe()

  await nextTick(async () => {
    if (!user.value) return

    await redirectAfterAuthByRole(user.value.role)

    emit('success')
  })
}, {
  catchCallback: message => serverErrorMessage.value = message ?? ''
})

const registerButtonAttrs = computed(() => {
  if (props.switchMode === 'route') {
    return {
      to: SITEMAP.authRegister.route
    }
  }

  return {
    onClick: () => emit('switch', 'register')
  }
})
</script>

<template>
  <UForm
    class="flex flex-col gap-4 max-w-[450px] w-full"
    :state="state"
    :schema="schema"
    @change="() => serverErrorMessage = ''"
    @submit.prevent="login()"
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
      :loading="isLoggingIn"
    >
      Войти
    </UButton>

    <UButton
      variant="link"
      block
      v-bind="registerButtonAttrs"
    >
      Зарегистрироваться
    </UButton>
  </UForm>
</template>
