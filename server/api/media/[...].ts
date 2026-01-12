export default defineEventHandler((event) => {
  const target = event.path.replace('/api/media/', '')

  return proxyRequest(event, target)
})
