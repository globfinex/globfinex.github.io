'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "4e9d4edfce8f1e079b21964c9f357d67",
"assets/assets/images/2.jpeg": "76c4679b9c80a55c128a222959f218cb",
"assets/assets/images/4.jpg": "f241c363d7b603ef4be89d5ff5f64634",
"assets/assets/images/4adgfah.jpg": "a5c4efbc1a2908138c71c04d0e42aa27",
"assets/assets/images/about2.png": "f682193e8995358011359ffce983c31b",
"assets/assets/images/deniz.jpg": "60507536321c08d3d02067ca89e4cb78",
"assets/assets/images/deniz1.jpg": "30de7988456ab676b22a146f55fa825a",
"assets/assets/images/kontener.jpg": "999ef78d12998e6994e45a9fb209db49",
"assets/assets/images/kontener2.jpg": "548ee7f9c1a663846204e55163ead037",
"assets/assets/images/kontener3.jpeg": "4fbe0b4c691ea43d84948f7e56f93130",
"assets/assets/images/sargyt1.png": "7b32bba5fbe00904848fd5fec8a12b43",
"assets/assets/images/sargyt2.png": "73f2f47b9ad256bb24be819a75f42c75",
"assets/assets/images/sargyt3.jpg": "da347cca4aa6c693340290a3ae3162de",
"assets/assets/images/service1.jpg": "b54b88071e35a698117ace29385fc32e",
"assets/assets/images/service2.jpg": "12107415d262ef0a012fc6dd32e8599c",
"assets/assets/images/service3.jpg": "552d7d6cda298248ffea1c2fc9bdfeb2",
"assets/assets/images/test_sargyt2.png": "b58577653895f61aea43631e40f26120",
"assets/assets/images/tir.png": "2a80c74bb6441aa9e86ce080fe0d5fd1",
"assets/assets/images/ucar.jpg": "31809b0af4e5b970af7d507f448f8ad7",
"assets/assets/images/ucar1.jpg": "0d6f1aeb0fe2d801951d113d7867ee40",
"assets/assets/images/yukug.png": "a89abea990365518d0dc1463065d5ec2",
"assets/assets/svg/copyright.svg": "27272cb8cefe2a888fb63005387e8a49",
"assets/assets/svg/email.svg": "d27f0c22547c193a9e2aa9bfb13441cd",
"assets/assets/svg/icq.svg": "24e8cbf9641dc500cc42d40beddea6d0",
"assets/assets/svg/imo.svg": "68d77ad6e5444fc76b2b583c86081bdd",
"assets/assets/svg/instagram.svg": "a2581432a9739f754c15e8225630f4e4",
"assets/assets/svg/logo1.svg": "4b33edcb5356b6e8e5f5ea532ef4dd51",
"assets/assets/svg/logo2.svg": "2a8b648ade0aafbae84687e71e07e098",
"assets/assets/svg/logo3.svg": "65c3d6e676745430570f6c934d12869a",
"assets/assets/svg/logo4.svg": "16925934b001f4e42b03c491bca9a3ac",
"assets/assets/svg/whatsapp.svg": "b65e7fbc7a6bb9e96984d3d2a4784e4f",
"assets/FontManifest.json": "a0dc84c27609e82a7ec67ead6d427195",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/fonts/Teko-Bold.ttf": "a57cd2d00fa838bd32992b064ec0b889",
"assets/fonts/Teko-Regular.ttf": "8ffcafe57ebe42657dee3a4a6ee22528",
"assets/NOTICES": "4b4fb433ef89d7c7aa3da9989c7c5c6d",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "1cfe996e845b3a8a33f57607e8b09ee4",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "f40d79147dd447f0fc7e5a5f4fb28def",
"/": "f40d79147dd447f0fc7e5a5f4fb28def",
"main.dart.js": "15b106c4d06d28c64b9693e373ed5969",
"manifest.json": "980a623c0577ab57e7e918ec8e2119e5",
"version.json": "4dde2ac0f63eda0fba1918e04eb37361"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
