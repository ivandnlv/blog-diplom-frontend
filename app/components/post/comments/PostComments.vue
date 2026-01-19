<script setup lang="ts">
import { postsCommentsApi } from '~/api/posts-comments'
import type { PostCommentEntity } from '~/types/post-comment'
import UiEmpty from '~/components/ui/UiEmpty.vue'

const props = withDefaults(defineProps<{
  showTitle?: boolean
  showForm?: boolean
  parentId?: number
  postId: number
  level?: number
}>(), {
  showTitle: true,
  showForm: true,
  level: 0
})

const uniqueId = [props.postId, props.parentId].filter(Boolean).join('-')

const { getPaginationQuery, setTotal, setFirstPage } = usePagination({
  uniqueId: `pagination:post-${uniqueId}-comments`
})

async function fetchCommentsByPost() {
  const { data } = await postsCommentsApi.get(props.postId, {
    ...getPaginationQuery(),
    parentId: props.parentId
  })

  setTotal(data.total)

  return data.items
}

const { data, pending, refresh } = useLazyAsyncData(`data:post-${uniqueId}-comments`, fetchCommentsByPost, {
  default: () => [] as PostCommentEntity[],
  server: false
})

const resetAndRefresh = () => {
  setFirstPage()
  refresh()
}

defineExpose({
  refresh
})
</script>

<template>
  <div
    class="flex flex-col gap-6"
  >
    <span
      v-if="showTitle"
      class="title-secondary"
    >Комментарии к публикации</span>

    <UiLoader v-if="pending" />

    <div
      v-if="data.length"
      class="flex flex-col gap-4"
    >
      <PostCommentsItem
        v-for="comment in data"
        :key="comment.id"
        :comment="comment"
        :level="level"
        @answered="resetAndRefresh()"
      />
    </div>

    <UiEmpty
      v-else
      title="Комментарии отсутствуют"
      description="Вы можете оставить комментарий к публикации"
    />

    <template v-if="showForm">
      <span class="title-secondary">Хотите оставить комментарий?</span>

      <UCard>
        <PostCommentsForm
          :post-id="postId"
          @success="resetAndRefresh()"
        />
      </UCard>
    </template>
  </div>
</template>
