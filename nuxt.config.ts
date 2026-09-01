const apiBase = process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api'
// backend origin without the /api/v1 suffix, e.g. http://localhost:8000 -
// used to proxy /storage/** (cars/brands/categories images) through to FastAPI,
// since the backend returns relative paths like "/storage/images/cars/x.jpg"
// and this app runs on a different origin/port.
const apiOrigin = apiBase.replace(/\/api\/v1\/?$/, '')

export default defineNuxtConfig({
    devtools: { enabled: false },

    runtimeConfig: {
        public: {
            apiBase
        }
    },

    colorMode: { preference: 'light' },

    modules: [
        '@nuxt/ui',
        '@formkit/nuxt',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        'nuxt-swiper',
        '@vite-pwa/nuxt',
    ],

    ssr: true,

    nitro: {
        preset: 'node-server'
    },

    routeRules: {
        '/storage/**': { proxy: `${apiOrigin}/storage/**` }
    },

    compatibilityDate: '2025-02-12',

    formkit: { autoImport: true },

    app: {
        head: {
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/icon.ico' },
                { rel: 'apple-touch-icon', href: '/pwa-icons/apple-touch-icon.png' },
            ],
            meta: [
                { name: 'theme-color', content: '#1B2430' },
                { name: 'mobile-web-app-capable', content: 'yes' },
                { name: 'apple-mobile-web-app-capable', content: 'yes' },
                { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
                { name: 'apple-mobile-web-app-title', content: 'کارپاز' },
            ],
        }
    },

    // Makes the storefront installable on mobile/desktop (Add to Home Screen)
    // and lets already-visited pages keep working offline.
    pwa: {
        registerType: 'autoUpdate',
        injectRegister: 'auto',

        manifest: {
            name: 'کارپاز | خرید و فروش خودرو',
            short_name: 'کارپاز',
            description: 'خرید، فروش و مشاوره خودرو - فروش ماشین شما در کمتر از یک روز',
            lang: 'fa',
            dir: 'rtl',
            start_url: '/',
            display: 'standalone',
            theme_color: '#1B2430',
            background_color: '#1B2430',
            icons: [
                { src: '/pwa-icons/pwa-64x64.png', sizes: '64x64', type: 'image/png' },
                { src: '/pwa-icons/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
                { src: '/pwa-icons/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
                { src: '/pwa-icons/maskable-icon-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
                { src: '/pwa-icons/maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
            ],
        },

        workbox: {
            navigateFallback: '/',
            // API calls and the proxied backend storage/images should always
            // hit the network first (cars/prices change often); everything
            // else Nuxt builds (js/css/fonts) is precached by the plugin.
            runtimeCaching: [
                {
                    urlPattern: /^\/api\/.*/,
                    handler: 'NetworkFirst',
                    options: { cacheName: 'api-cache', networkTimeoutSeconds: 8 },
                },
                {
                    urlPattern: /^\/storage\/.*/,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'storage-images-cache',
                        expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
                    },
                },
            ],
        },

        client: {
            installPrompt: true,
        },

        devOptions: {
            enabled: false,
        },
    },
})
