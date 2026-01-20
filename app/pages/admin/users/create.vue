<script setup lang="ts">
import { useAdminLayoutBack } from '~/composables/admin/use-admin-layout-back'
import { SITEMAP } from '~/constants/app/sitemap'
import type { UserEntity } from '~/types/user'

definePageMeta({
  layout: 'admin'
})

useAdminLayoutBack(SITEMAP.adminUsers.route)

const onUserCreated = (user: UserEntity) => {
  navigateTo({
    ...SITEMAP.adminUsersId.route,
    params: {
      id: user.id
    }
  })
}
</script>

<template>
  <AdminUiPageContainer>
    <h1 class="title-main">
      {{ SITEMAP.adminUsersCreate.name }}
    </h1>

    <UCard>
      <AdminUsersForm
        @success="onUserCreated"
      />
    </UCard>
  </AdminUiPageContainer>
</template>
