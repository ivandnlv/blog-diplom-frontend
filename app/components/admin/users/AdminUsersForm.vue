<script setup lang="ts">
import type { UserEntity } from '~/types/user'
import { adminUsersApi, type AdminUsersApiType } from '~/api/admin/admin-users'
import { appValidator } from '~/helpers/validation'
import { object } from 'yup'

const props = defineProps<{
  user?: UserEntity
}>()

const emit = defineEmits<{
  (e: 'success', value: UserEntity): void
}>()

const state = reactive<Partial<AdminUsersApiType['Post']['Body']>>({
  email: props.user?.email ?? '',
  username: props.user?.username ?? '',
  avatarUrl: props.user?.avatarUrl ?? '',
  password: undefined
})

const schema = computed(() => {
  if (props.user) return object({
    avatarUrl: appValidator.isUrl(),
    password: appValidator.isOptionalPassword()
  })

  return object({
    email: appValidator.requiredEmail(),
    avatarUrl: appValidator.isUrl(),
    username: appValidator.required(),
    password: appValidator.requiredPassword()
  })
})

async function createOrEditUser() {
  const { data } = props.user
    ? await adminUsersApi.patch(props.user.id, {
        username: state.username,
        password: state.password,
        avatarUrl: state.avatarUrl
      })
    : await adminUsersApi.post({
        avatarUrl: state.avatarUrl ?? '',
        email: state.email ?? '',
        password: state.password ?? '',
        username: state.username ?? ''
      })

  useSuccessNotification(props.user ? 'Изменения сохранены!' : 'Пользователь создан!')

  emit('success', data)
}

const { runWithLoading: onSubmit, isLoading } = useTryCatchWithLoading(createOrEditUser)
</script>

<template>
  <UForm
    class="flex flex-col gap-8"
    :state="state"
    :schema="schema"
    @submit.prevent="onSubmit"
  >
    <UFormField
      name="avatarUrl"
      label="Фото"
    >
      <UiImageUrlUpload
        v-model="state.avatarUrl"
        image-ui="size-32"
      />
    </UFormField>

    <UFormField
      name="email"
      label="Email"
      :required="!user"
    >
      <UInput
        v-model="state.email"
        :disabled="!!user"
        placeholder="Введите email"
      />
    </UFormField>

    <UFormField
      name="username"
      label="Имя"
      :required="!user"
    >
      <UInput
        v-model="state.username"
        placeholder="Введите имя/псевдоним"
      />
    </UFormField>

    <UFormField
      name="password"
      label="Пароль (если необходимо изменить)"
      :required="!user"
    >
      <UiInputPassword
        v-model="state.password"
        placeholder="Введите новый пароль"
      />
    </UFormField>

    <UButton
      block
      type="submit"
      :loading="isLoading"
    >
      {{ user ? 'Сохранить' : 'Создать' }}
    </UButton>
  </UForm>
</template>
