<script setup lang="ts">
import { SITEMAP } from '~/constants/app/sitemap'
import { adminUsersApi } from '~/api/admin/admin-users'
import type { UserEntity } from '~/types/user'

definePageMeta({
  layout: 'admin'
})

const { getPaginationQuery, setTotal } = usePagination({
  limit: 20
})

async function fetchUsers() {
  const { data } = await adminUsersApi.getList(getPaginationQuery())

  setTotal(data.total)

  return data.items
}

const { data, pending } = useAsyncData('data:admin-users', fetchUsers, { default: () => [] as UserEntity[] })

const emptyDescription = `Создайте первого пользователя <br/> С помощью кнопки «Создать»`
</script>

<template>
  <AdminUiPageContainer>
    <h1 class="title-main">
      {{ SITEMAP.adminUsers.name }}
    </h1>

    <UiLoader v-if="pending" />

    <AdminUsersTable
      v-else-if="data?.length"
      :users="data"
    />

    <UiEmpty
      v-else
      title="Нет пользователей"
      :description="emptyDescription"
    />
  </AdminUiPageContainer>
</template>
