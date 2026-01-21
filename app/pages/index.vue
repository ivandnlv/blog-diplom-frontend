<script setup lang="ts">
const store = usePostsStore()
const { data, pending } = storeToRefs(store)

const containerClass = 'flex flex-col max-w-[626px] w-full mx-auto gap-6'
</script>

<template>
  <div class="flex flex-col gap-12">
    <div
      v-if="pending"
      :class="containerClass"
    >
      <PostCardSkeleton
        v-for="i in 4"
        :key="`skeleton-${i}`"
      />
    </div>

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
  </div>
</template>
