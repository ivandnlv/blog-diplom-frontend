<script setup lang="ts">
import type { UserEntity } from '~/types/user'
import { usersApi, type UsersApiType } from '~/api/users'
import { object } from 'yup'
import { appValidator } from '~/helpers/validation'

const props = defineProps<{
  user: UserEntity
}>()

const emit = defineEmits<{
  (e: 'success', user: UserEntity): void
}>()

const state = reactive<UsersApiType['Patch']['Body']>({
  avatarUrl: props.user?.avatarUrl,
  username: props.user?.username,
  newPassword: undefined
})

const schema = object({
  avatarUrl: appValidator.isUrl(),
  username: appValidator.required(),
  newPassword: appValidator.isOptionalPassword()
})

async function patch() {
  const { data } = await usersApi.patch(state)

  useSuccessNotification('Изменения сохранены!')

  emit('success', data)
}

const { runWithLoading: patchWrapped, isLoading } = useTryCatchWithLoading(patch)
</script>

<template>
  <UForm
    class="flex flex-col gap-6"
    :state="state"
    :schema="schema"
    @submit.prevent="patchWrapped()"
  >
    <UFormField
      label="Фото"
      name="avatarUrl"
    >
      <UiImageUrlUpload
        v-model="state.avatarUrl"
      />
    </UFormField>

    <UFormField
      label="Имя / псевдоним"
      name="username"
      required
    >
      <UInput
        v-model="state.username"
        placeholder="Введите ваше имя или псевдоним"
      />
    </UFormField>

    <UFormField
      label="Новый пароль (если забыли старый)"
      name="newPassword"
    >
      <UiInputPassword
        v-model="state.newPassword"
        placeholder="Введите новый пароль"
      />
    </UFormField>

    <UButton
      type="submit"
      block
      :loading="isLoading"
    >
      Сохранить изменения
    </UButton>
  </UForm>
</template>
