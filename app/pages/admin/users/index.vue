<script setup lang="ts">
import { SITEMAP } from '~/constants/app/sitemap'
import { adminUsersApi } from '~/api/admin/admin-users'
import type { UserEntity } from '~/types/user'
import { LazyUiModalConfirm } from '#components'

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

async function deleteUser(id: number) {
  await adminUsersApi.delete(id)

  useSuccessNotification('Пользователь удален!')

  await refresh()
}

const deleteUserWrapped = useTryCatch(deleteUser)

const overlay = useOverlay()

const onUserDelete = (id: number) => {
  overlay.create(LazyUiModalConfirm, {
    props: {
      description: 'Вы действительно хотите удалить пользователя?',
      onConfirm: () => deleteUserWrapped(id)
    }
  }).open()
}
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

    <template v-else-if="data?.length">
      <AdminUsersTable
        class="max-lg:hidden"
        :users="data"
        @delete="onUserDelete"
      />

      <AdminUsersCards
        class="lg:hidden"
        :users="data"
        @delete="onUserDelete"
      />
    </template>

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
