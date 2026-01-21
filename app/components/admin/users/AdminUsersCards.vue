<script setup lang="ts">
import type { UserEntity } from '~/types/user'
import type { EntityCardField } from '~/types/admin/ui/entity-card'
import { SITEMAP } from '~/constants/app/sitemap'

defineProps<{
  users: UserEntity[]
}>()

const emit = defineEmits<{
  (e: 'delete', userId: number): void
}>()

const fields: EntityCardField<UserEntity>[] = [
  {
    accessorKey: 'avatarUrl',
    header: 'Фото'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'username',
    header: 'Имя'
  }
]
</script>

<template>
  <AdminUiEntityCardList
    :data="users"
    :fields="fields"
  >
    <template #avatarUrl-row="{ item }">
      <UAvatar
        v-if="item?.avatarUrl"
        class="size-16"
        :src="item.avatarUrl"
      />

      <span v-else>отсутствует</span>
    </template>

    <template #item-bottom="{ item }">
      <div class="flex flex-col gap-4 mt-auto">
        <UButton
          :to="{
            ...SITEMAP.adminUsersId.route,
            params: {
              id: item.id
            }
          }"
          block
        >
          Редактировать
        </UButton>

        <UButton
          color="error"
          block
          @click="emit('delete', item.id)"
        >
          Удалить
        </UButton>
      </div>
    </template>
  </AdminUiEntityCardList>
</template>
