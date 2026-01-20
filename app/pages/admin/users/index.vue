<script setup lang="ts">
import { SITEMAP } from '~/constants/app/sitemap'
import { adminUsersApi } from '~/api/admin/admin-users'
import type { UserEntity } from '~/types/user'

definePageMeta({
  layout: 'admin'
})

const LIMIT = 20

const { getPaginationQuery, setTotal, pagesCount, currentPage, total } = usePagination({
  limit: LIMIT,
  uniqueId: 'pagination:admin-users'
})

async function fetchUsers() {
  const { data } = await adminUsersApi.getList(getPaginationQuery())

  setTotal(data.total)

  return data.items
}

const { data, pending, refresh } = useAsyncData('data:admin-users', fetchUsers, { default: () => [] as UserEntity[] })

watch(currentPage, () => refresh())

const emptyDescription = `Создайте первого пользователя <br/> С помощью кнопки «Создать»`
</script>

<template>
  <AdminUiPageContainer>
    <div class="flex justify-between items-center">
      <h1 class="title-main">
        {{ SITEMAP.adminUsers.name }}
      </h1>

      <UButton
        :to="SITEMAP.adminUsersCreate.route"
      >
        Создать
      </UButton>
    </div>

    <UiLoader v-if="pending" />

    <AdminUsersTable
      v-else-if="data?.length"
      :users="data"
      @deleted="refresh"
    />

    <UiEmpty
      v-else
      title="Нет пользователей"
      :description="emptyDescription"
    />

    <UPagination
      v-if="pagesCount > 1"
      v-model:page="currentPage"
      :total="total"
      :items-per-page="LIMIT"
    />
  </AdminUiPageContainer>
</template>
