<script setup lang="ts">
import type { UserEntity } from '~/types/user'
import type { TableColumn } from '#ui/components/Table.vue'
import { ICONS_HERO } from '~/constants/icons/hero'
import { SITEMAP } from '~/constants/app/sitemap'
import { adminUsersApi } from '~/api/admin/admin-users'
import { LazyUiModalConfirm } from '#components'

defineProps<{
  users: UserEntity[]
}>()

const emit = defineEmits<{
  (e: 'delete', userId: number): void
}>()

const columns: TableColumn<UserEntity>[] = [
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
    header: 'Имя / псевдоним'
  },
  {
    accessorKey: 'actions',
    header: ''
  }
]
</script>

<template>
  <UTable
    :data="users"
    :columns="columns"
  >
    <template #avatarUrl-cell="{ row }">
      <UAvatar
        v-if="row.original?.avatarUrl"
        class="size-12"
        :src="row.original.avatarUrl"
      />
      <span v-else>-</span>
    </template>

    <template #actions-cell="{ row }">
      <div class="flex justify-end gap-4 items-center">
        <UButton
          :icon="ICONS_HERO.PENCIL_SQUARE_16_SOLID"
          :to="{
            ...SITEMAP.adminUsersId.route,
            params: {
              id: row.original.id
            }
          }"
        />

        <UButton
          color="error"
          :icon="ICONS_HERO.TRASH_16_SOLID"
          @click="emit('delete', row.original.id)"
        />
      </div>
    </template>
  </UTable>
</template>
