<script setup lang="ts">
import { SITEMAP } from '~/constants/app/sitemap'
import { authApi, type AuthApiType } from '~/api/auth'
import { object } from 'yup'
import { appValidator } from '~/helpers/validation'
import { useTryCatchWithLoading } from '~/composables/use-try-catch-with-loading'
import { redirectAfterAuthByRole } from '~/helpers/auth/redirect-after-auth-by-role'

definePageMeta({
  layout: false,
  middleware: 'only-unauthorized'
})

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

  nextTick(async () => {
    if (!user.value) return

    await redirectAfterAuthByRole(user.value.role)
  })
}, {
  catchCallback: message => serverErrorMessage.value = message
})
</script>

<template>
  <AuthPagesWrapper>
    <h1 class="title-main">
      {{ SITEMAP.auth.name }}
    </h1>

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
        :to="SITEMAP.authRegister.route"
      >
        Зарегистрироваться
      </UButton>
    </UForm>
  </AuthPagesWrapper>
</template>
