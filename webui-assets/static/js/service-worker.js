
//service worker install
self.addEventListener("install", (e) => {
  console.log("service Worker: Installed");
});

//service worker activated
self.addEventListener("activate", (e) => {
  console.log("service Worker: Activated");
/*   e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  ); */
});

//Call fetch event
self.addEventListener("fetch", (e) => {
  console.log("Service Worker : fetching");
/*   e.resposndWith(
    fetch(e.request)
      .then((res) => {
        //make copy/clone of response
        const resClone = res.clone();
        caches.open(cacheName).then((cache) => {
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch((err) => caches.match(e.request).then((res) => res))
  ); */
});
