const cacheName = "v1";

 const cacheAssets =[
  'index.html',
  'App.js',
  'xcalrWebUI.js',
  './Dashboard/Dashboard.js ',
  './FloaterHelp/FloaterHelp.js',
  './View/View.js',
  './Maintain/Maintain.js',
  './Maintain/Subscriptioncreate.js',
  './Maintain/Subscriptionupgrade.js',
  './Maintain/Groupcreate.js',
  './Maintain/Groupupgrade.js',
  './Maintain/GroupView.js',
  './Maintain/Maintainagentcreate.js',
  './Maintain/Maintainagentupgrade.js',
  './Maintain/Maintainagentview.js',
  './Maintain/RequestCreate.js',
  './Maintain/RequestUpgrade.js',
  './Maintain/RequestView.js',
  './Maintain/Subscriptionview.js', 
  './Monitor/Monitor.js',
  './Monitor/Notification.js',
  './Monitor/Alert.js',
  './Monitor/Healthstatus.js',
  './Report/Report.js',
  './Settings/UserManagement.js',
  './Settings/UserProfile.js',
  './Settings/WebHooks.js',
  './Navbar/Navbar.js',
  './Header/Header.js',
  './Support/Support.js',
  './Cookienotification/Cookienotification.js',
  './Footer/Footer.js',
  './static/images'
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
