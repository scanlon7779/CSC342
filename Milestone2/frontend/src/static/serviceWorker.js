function log(...data) {
  console.log("SWv1.0", ...data);
}

log("SW Script executing");


const STATIC_CACHE_NAME = 'HToHWager-static-v1';


self.addEventListener('install', event => {
  // log('install', event);

  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(cache => {
      return cache.addAll([
        '/offline',
        //HTML
        '/offlineCreate.html',
        '/offlineAccount.html',
        //Img
        '/img/01.png',
        //CSS
        '/css/acount.css',
        '/css/admin.css',
        '/css/browse.css',
        '/css/create.css',
        '/css/myHistory.css',
        '/css/pendingWagers.css',
        '/css/styles.css',
        //Scripts
        '/js/acceptedWager.js',
        '/js/account.js',
        '/js/admin.js',
        '/js/APIClient.js',
        '/js/bet.js',
        '/js/browse.js',
        '/js/common.js',
        '/js/create.js',
        '/js/format.js',
        '/js/login.js',
        '/js/myHistory.js',
        '/js/pendingWagers.js',
        '/js/registration.js',
        '/js/route.js',
        '/js/user.js',
        '/js/offlineCreate.js',
        '/js/offlineAccount.js',
        //External Resources
        'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css'
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  // log('activate', event);

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('HToHWager-') && cacheName != STATIC_CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      )
    })
  );
});

self.addEventListener('fetch', event => {
  // log('fetch', event);

  var requestUrl = new URL(event.request.url);
  if(requestUrl.origin === location.origin && requestUrl.pathname.startsWith('/api')) {
    if(event.request.method === "GET") {
      let regexForBet = /\/users\/.+?\/bets/;
      if (regexForBet.test(requestUrl.pathname) || requestUrl.pathname.includes('currentUser')) {
        event.respondWith(
          fetchFirst(event.request)
        );
      } else {
        event.respondWith(
          cacheFirst(event.request)
        );
      }
    }
  }
  else {
    event.respondWith(
      cacheFirst(event.request)
    );
  }
});

function fetchFirst(request) {
  return fetch(request).then(response => {
    console.log('response',response);
    if (response.ok) {
      caches.open(STATIC_CACHE_NAME).then(cache => {
        cache.put(request, response);
      });
    }
    return response.clone();
  })
  .catch(() => {
    return caches.match(request);
  })
}


function cacheFirst(request) {
  return caches.match(request).then(response => {
    //Return a response if we have one cached. Otherwise, get from the network
    return response || fetchAndCache(request);
  })
  .catch(error => {
    return caches.match('/offline');
  })
}

function fetchAndCache(request) {
  return fetch(request).then(response => {
    var requestUrl = new URL(request.url);
    //Cache everything except login
    if (response.ok && !requestUrl.pathname.startsWith('/login')) {
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        cache.put(request, response);
      });
    }
    return response.clone();
  })
  .catch(error => {
    return caches.match('/offline');
  });
}


self.addEventListener('message', event => {
  log('message', event.data);
  if(event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});



