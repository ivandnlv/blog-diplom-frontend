<script setup lang="ts">
definePageMeta({
  scrollToTop: true
})

const store = usePostsStore()
const { data, pending, isLastPage, morePending } = storeToRefs(store)

const containerClass = 'flex flex-col max-w-[626px] w-full mx-auto gap-6'

const [DefineSkeletonTemplate, ReuseSkeletonTemplate] = createReusableTemplate<{
  value?: string
}>()

useInfiniteScrollFetch({
  loadMoreCallback: store.fetchMore,
  isLastPage
})
</script>

<template>
  <div
    class="flex flex-col gap-12"
  >
    <DefineSkeletonTemplate v-slot="{ value }">
      <div
        :class="containerClass"
      >
        <PostCardSkeleton
          v-for="i in 4"
          :key="`skeleton-${value}-${i}`"
        />
      </div>
    </DefineSkeletonTemplate>

    <ReuseSkeletonTemplate
      v-if="pending"
      value="main"
    />

    <div
      v-else-if="data?.length"
      :class="containerClass"
    >
      <PostCard
        v-for="post in data"
        :key="post.id"
        :post="post"
      />
    </div>

    <ReuseSkeletonTemplate
      v-if="morePending"
      value="more"
    />
  </div>
</template>
