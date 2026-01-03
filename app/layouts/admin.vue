<script setup lang="ts">

</script>

<template>
  <div class="flex relative flex-col min-h-svh">
    <div class="flex w-full h-full">
      <LayoutAdminSidebar
        class="fixed left-0 top-0 z-lower-max"
      />

      <main class="w-full py-12">
        <UContainer>
          <slot />
        </UContainer>
      </main>
    </div>
  </div>
</template>
