<script setup lang="ts">
import type { PostEntity } from '~/types/post'
import { postsCommentsApi } from '~/api/posts-comments'
import type { PostCommentEntity } from '~/types/post-comment'
import UiEmpty from '~/components/ui/UiEmpty.vue'

const props = defineProps<{
  post: PostEntity
}>()

const { getPaginationQuery, setTotal, setFirstPage } = usePagination({
  uniqueId: `pagination:post-${props.post.id}-comments`
})

async function fetchCommentsByPost() {
  const { data } = await postsCommentsApi.get(props.post.id, getPaginationQuery())

  setTotal(data.total)

  return data.items
}

const { data, pending, refresh } = useLazyAsyncData(`data:post-${props.post.id}-comments`, fetchCommentsByPost, {
  default: () => [] as PostCommentEntity[],
  server: false
})

const resetAndRefresh = () => {
  setFirstPage()
  refresh()
}
</script>

<template>
  <div
    class="flex flex-col gap-6"
  >
    <span class="title-secondary">Комментарии к публикации</span>

    <UiLoader v-if="pending" />

    <div
      v-if="data.length"
      class="flex flex-col gap-4"
    >
      <PostCommentsItem
        v-for="comment in data"
        :key="comment.id"
        :comment="comment"
      />
    </div>

    <UiEmpty
      v-else
      title="Комментарии отсутствуют"
      description="Вы можете оставить комментарий к публикации"
    />

    <span class="title-secondary">Хотите оставить комментарий?</span>

    <UCard>
      <PostCommentsForm
        :post-id="post.id"
        @success="resetAndRefresh()"
      />
    </UCard>
  </div>
</template>
