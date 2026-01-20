<template>
  <div class="relative">
    <LayoutDefaultHeader class="fixed top-0 left-0" />

    <main class="min-h-(--default-main-min-height) mt-(--default-header-height)">
      <UContainer class="w-full py-12 h-full">
        <slot />
      </UContainer>
    </main>

    <footer class="flex flex-col justify-center h-(--default-footer-height)">
      <UContainer class="flex w-full justify-between">
        <ULink to="/ui">Ui kit</ULink>

        <UiLogo />
      </UContainer>
    </footer>
  </div>
</template>
