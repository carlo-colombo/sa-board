self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('board').then(function(cache) {
      return cache.addAll(['/app.js', '/app.css', '/'])
    })
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request)
    })
  )
})
