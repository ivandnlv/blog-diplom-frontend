<script setup lang="ts">
const store = usePostsStore()
const { data } = storeToRefs(store)
</script>

<template>
  <div class="flex flex-col gap-12">
    <div
      v-if="data?.length"
      class="flex flex-col max-w-[626px] w-full mx-auto gap-6"
    >
      <PostCard
        v-for="post in data"
        :key="post.id"
        :post="post"
      />
    </div>
  </div>
</template>
