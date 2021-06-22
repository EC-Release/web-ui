//service workers for background sync and caching
//service worker install
self.addEventListener("install", (e) => {
  console.log("service Worker: Installed");
});

//service worker activated
self.addEventListener("activate", (e) => {
  console.log("service Worker: Activated");
});

