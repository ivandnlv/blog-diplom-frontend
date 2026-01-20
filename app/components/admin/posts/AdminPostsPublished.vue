<script setup lang="ts">
import type { PostEntity } from '~/types/post'
import { ICONS_HERO } from '~/constants/icons/hero'
import { adminPostsApi } from '~/api/admin/admin-posts'
import { useSuccessNotification } from '~/composables/use-notification'

const props = defineProps<{
  post: PostEntity
}>()

const emit = defineEmits<{
  (e: 'published'): void
}>()

const isPublished = ref(props.post.published)

watch(() => props.post.published, () => isPublished.value = props.post.published)

async function toggleIsPublished() {
  const { data } = await adminPostsApi.patch(props.post.id, {
    published: !isPublished.value
  })

  isPublished.value = data.published

  useSuccessNotification(data.published ? 'Опубликовано!' : 'Скрыто!')

  emit('published')
}

const { runWithLoading: togglePublishedWithLoading, isLoading } = useTryCatchWithLoading(toggleIsPublished)
</script>

<template>
  <div class="flex gap-8 w-full">
    <div
      class="flex w-full gap-4 items-center rounded-xl p-4"
      :class="{
        'bg-primary': isPublished,
        'bg-zinc-700': !isPublished
      }"
    >
      <UIcon
        class="size-6 text-inverted"
        :name="isPublished ? ICONS_HERO.EYE_16_SOLID : ICONS_HERO.EYE_SLASH_16_SOLID"
      />

      <span class="text-inverted">{{ isPublished ? 'Опубликовано' : 'Публикация скрыта' }}</span>
    </div>

    <UButton
      class="max-w-[160px]"
      block
      :color="isPublished ? 'secondary' : 'primary'"
      :loading="isLoading"
      @click="togglePublishedWithLoading()"
    >
      {{ isPublished ? 'Скрыть' : 'Опубликовать' }}
    </UButton>
  </div>
</template>
