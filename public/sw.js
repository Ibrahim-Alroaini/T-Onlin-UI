const CACHE_NAME = 'tonlin-shell-v2'
const APP_ROOT = self.registration.scope
const APP_ENTRY = new URL('index.html', APP_ROOT).toString()

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.add(APP_ENTRY))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith('tonlin-shell-') && key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', event => {
  const request = event.request
  const url = new URL(request.url)
  if (request.method !== 'GET' || url.origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) caches.open(CACHE_NAME).then(cache => cache.put(APP_ENTRY, response.clone()))
          return response
        })
        .catch(async () => (await caches.match(APP_ENTRY)) || Response.error()),
    )
    return
  }

  event.respondWith((async () => {
    const cached = await caches.match(request)
    if (cached) return cached
    const response = await fetch(request)
    if (response.ok && response.type === 'basic') {
      const cache = await caches.open(CACHE_NAME)
      await cache.put(request, response.clone())
    }
    return response
  })())
})
