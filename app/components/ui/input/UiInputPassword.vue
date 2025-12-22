<script setup lang="ts">
import type { InputProps } from '#ui/components/Input.vue'
import { ICONS_HERO } from '~/constants/icons/hero'

type Props = Omit<InputProps, 'modelValue' | 'type'>

const props = defineProps<Props>()
const model = defineModel<string | undefined>()

const [isHidden, toggleHidden] = useToggle(true)
</script>

<template>
  <UInput
    v-model="model"
    v-bind="props"
    :type="isHidden ? 'password' : 'text'"
  >
    <template #trailing>
      <UButton
        variant="link"
        :icon="isHidden ? ICONS_HERO.EYE_16_SOLID : ICONS_HERO.EYE_SLASH_16_SOLID"
        @click="toggleHidden()"
      />
    </template>
  </UInput>
</template>
