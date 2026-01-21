<script setup lang="ts">
import type { UserProps } from '#ui/components/User.vue'
import LayoutUserDropdownMenu from '~/components/layout/user/LayoutUserDropdownMenu.vue'

const props = defineProps<{
  userUi?: UserProps['ui']
}>()

const { user } = storeToRefs(useAuthStore())

const mergedUserUi = computed(() => {
  if (!props.userUi) return {
    avatar: 'text-inverted group-hover/user:scale-100'
  }

  return {
    ...props.userUi,
    avatar: 'avatar' in props.userUi ? [props.userUi.avatar, 'text-inverted group-hover/user:scale-100'].join(' ') : 'text-inverted group-hover/user:scale-100'
  }
})

const isMobile = useIsMobile('(max-width: 500px)')

const [DefineUserTemplate, ReuseUserTemplate] = createReusableTemplate()
</script>

<template>
  <div v-if="user">
    <DefineUserTemplate>
      <UUser
        class="cursor-pointer transition-colors lg:hover:bg-inverted p-1.5 rounded-sm"
        :name="user.username"
        :description="user.email"
        :avatar="{
          src: user.avatarUrl,
          alt: user.username
        }"
        :ui="mergedUserUi"
      />
    </DefineUserTemplate>

    <LayoutUserMobileDrawer
      v-if="isMobile"
    >
      <ReuseUserTemplate />
    </LayoutUserMobileDrawer>

    <LayoutUserDropdownMenu
      v-else
    >
      <ReuseUserTemplate />
    </LayoutUserDropdownMenu>
  </div>
</template>
