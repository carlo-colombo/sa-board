self.addEventListener("install",function(e){e.waitUntil(caches.open("board").then(function(e){return e.addAll(["/app-9f2c38664e.js","/app-ff11e1b0d2.css","/"])}))}),self.addEventListener("fetch",function(e){e.respondWith(fetch(e.request).catch(function(){return caches.match(e.request)}))});