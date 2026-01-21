<script setup lang="ts">
import { SITEMAP } from '~/constants/app/sitemap'

definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const { isAdmin } = storeToRefs(useSessionStore())

onBeforeMount(() => {
  if (!isAdmin.value) return

  setPageLayout('admin')
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="title-main">
      {{ SITEMAP.myProfile.name }}
    </h1>

    <UCard v-if="user">
      <ProfileForm
        :user="user"
        @success="authStore.setUser"
      />
    </UCard>
  </div>
</template>
