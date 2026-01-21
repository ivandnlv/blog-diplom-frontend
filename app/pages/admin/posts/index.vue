<script setup lang="ts">
import { SITEMAP } from '~/constants/app/sitemap'
import { useAdminPostsApi } from '~/composables/admin/use-admin-posts-api'
import { adminPostsApi } from '~/api/admin/admin-posts'
import { useTryCatch } from '~/composables/use-try-catch'
import { LazyUiModalConfirm } from '#components'

definePageMeta({
  layout: 'admin'
})

const LIMIT = 20

const { data, pending, pagesCount, currentPage, total, refresh } = useAdminPostsApi('admin-posts', LIMIT)

const emptyDescription = `Создайте первую публикацию <br/> С помощью кнопки «Создать»`

async function deletePost(id: number) {
  await adminPostsApi.delete(id)

  useSuccessNotification('Публикация удалена!')

  await refresh()
}

const deletePostWithTryCatch = useTryCatch(deletePost)

const overlay = useOverlay()

const onDeletePost = (postId: number) => {
  overlay.create(LazyUiModalConfirm, {
    props: {
      description: 'Вы действительно хотите удалить публикацию?',
      onConfirm: () => deletePostWithTryCatch(postId)
    }
  }).open()
}
</script>

<template>
  <AdminUiPageContainer>
    <div class="flex items-center justify-between gap-6">
      <h1 class="title-main">
        {{ SITEMAP.adminPosts.name }}
      </h1>

      <UButton
        :to="SITEMAP.adminPostsCreate.route"
      >
        Создать
      </UButton>
    </div>

    <UiSkeletonTable
      v-if="pending"
    />

    <template v-else-if="data?.length">
      <AdminPostsTable
        class="max-lg:hidden"
        :posts="data"
        @delete="onDeletePost"
      />

      <AdminPostsCards
        :posts="data"
        class="lg:hidden"
        @delete="onDeletePost"
      />
    </template>

    <UiEmpty
      v-else
      title="Нет публикаций"
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
