<script setup lang="ts">
import type { UserEntity } from '~/types/user'
import type { TableColumn } from '#ui/components/Table.vue'

defineProps<{
  users: UserEntity[]
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
  }
]
</script>

<template>
  <UTable
    :data="users"
    :columns="columns"
  >
    <template #avatarUrl-cell="{ row }">
      <NuxtImg v-if="row.original?.avatarUrl" />
      <span v-else>-</span>
    </template>
  </UTable>
</template>
