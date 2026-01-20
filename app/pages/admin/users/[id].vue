<script setup lang="ts">
import { useAdminLayoutBack } from '~/composables/admin/use-admin-layout-back'
import { SITEMAP } from '~/constants/app/sitemap'
import { adminUsersApi } from '~/api/admin/admin-users'

definePageMeta({
  layout: 'admin'
})

useAdminLayoutBack(SITEMAP.adminUsers.route)

const route = useRoute()

const id = computed(() => {
  const routeIdToNumber = Number(route?.params?.id)

  if (Number.isNaN(routeIdToNumber)) return undefined

  return routeIdToNumber
})

async function fetchUser() {
  if (!id.value) return

  const { data } = await adminUsersApi.getById(id.value)

  return data
}

const { data, pending } = useAsyncData(`data:user-${id.value}`, fetchUser, { default: () => null })
</script>

<template>
  <AdminUiPageContainer>
    <h1 class="title-main">
      <span>{{ SITEMAP.adminUsersId.name }}</span>
    </h1>

    <UiLoader v-if="pending" />

    <UCard
      v-else-if="data"
    >
      <AdminUsersForm
        :user="data"
      />
    </UCard>
  </AdminUiPageContainer>
</template>
