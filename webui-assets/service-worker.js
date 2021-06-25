const cacheName = "v1";

 const cacheAssets =[
  'index.html',
  'App.js',
  'xcalrWebUI.js',
  'Dashboard/Dashboard.js ',
  './FloaterHelp/FloaterHelp.js', 
] 

//service worker install
self.addEventListener("install", (e) => {
  console.log("service Worker: Installed");
   e.waitUntil(
    caches
    .open(cacheName)
    .then(cache=>
    {  console.log('Service Worker: caching files');
      cache.addAll(cacheAssets)})
      .then(()=>self.skipWaiting())
  ) 
});

//service worker activated
self.addEventListener("activate", (e) => {
  console.log("service Worker: Activated");
    e.waitUntil(
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
  );  
});

//Call fetch event
self.addEventListener("fetch", (e) => {
  console.log("Service Worker : fetching");
/*   e.respondWith(
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
 
    e.respondWith(
    fetch(e.request)
    .catch(() => caches.match(e.request))
  ) 
  
  
});

 if (window.Worker) {
        var myWorker = new Worker("worker.js");
        var authToken = this.getToken('ec-config');
        var message = { api: "/v1.2beta/ops/api/snapshot", authToken: authToken };
      
        myWorker.postMessage(message);
        myWorker.onmessage = function (e) {
          console.dir(e.data.result);
        };
      }
       
       function getToken(name){
        var cookieName = name+"=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
              c = c.substring(1);
            }
            if (c.indexOf(cookieName) == 0) {
              return c.substring(cookieName.length, c.length);
            }
      }


