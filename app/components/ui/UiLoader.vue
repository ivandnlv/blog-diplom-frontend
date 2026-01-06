<template>
  <div class="flex flex-col w-full justify-center items-center min-h-[400px]">
    <span class="loader" />
  </div>
</template>

<style scoped>
@import '~/assets/css/main.css';

.loader {
  --main-color: var(--ui-primary);
  --darken-main-color: var(--ui-primary-muted);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 4rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  border-radius: 50%;
  animation: pulsOut 1.8s ease-in-out infinite;
  filter: drop-shadow(0 0 1rem var(--darken-main-color));
}
.loader:before {
  width: 100%;
  padding-bottom: 100%;
  box-shadow: inset 0 0 0 1rem var(--main-color);
  animation-name: pulsIn;
}
.loader:after {
  width: calc(100% - 2rem);
  padding-bottom: calc(100% - 2rem);
  box-shadow: 0 0 0 0 var(--main-color);
}

@keyframes pulsIn {
  0% {
    box-shadow: inset 0 0 0 1rem var(--main-color);
    opacity: 1;
  }
  50%, 100% {
    box-shadow: inset 0 0 0 0 var(--main-color);
    opacity: 0;
  }
}

@keyframes pulsOut {
  0%, 50% {
    box-shadow: 0 0 0 0 var(--main-color);
    opacity: 0;
  }
  100% {
    box-shadow: 0 0 0 1rem var(--main-color);
    opacity: 1;
  }
}
</style>
