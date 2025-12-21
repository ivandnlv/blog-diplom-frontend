// plugins/fetch.ts
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const apiFetch = $fetch.create({
    baseURL: `${config.public.apiBase}/api`
  })

  return {
    provide: {
      apiFetch
    }
  }
})
