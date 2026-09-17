const apiBase = process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api'
// backend origin without the /api/v1 suffix, e.g. http://localhost:8000 -
// used to proxy /storage/** (cars/brands/categories images) through to FastAPI,
// since the backend returns relative paths like "/storage/images/cars/x.jpg"
// and this app runs on a different origin/port.
const apiOrigin = apiBase.replace(/\/api\/v1\/?$/, '')

// دامنه‌ی نهایی سایت - برای canonical URL ها، og:url و ساخت sitemap.xml لازمه.
// حتماً در production این رو با متغیر محیطی NUXT_PUBLIC_SITE_URL به دامنه‌ی
// واقعی سایت ست کنید، وگرنه این مقدار placeholder توی متادیتای صفحات میره.
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com'

export default defineNuxtConfig({
    devtools: { enabled: false },

    runtimeConfig: {
        public: {
            apiBase,
            siteUrl,
        }
    },

    site: {
        url: siteUrl,
        name: 'کارپاز',
    },

    colorMode: { preference: 'light' },

    // @nuxt/icon (که @nuxt/ui خودش داخلی نصبش می‌کنه) توی بعضی نسخه‌ها یه
    // باگ شناخته‌شده داره: فایل سرورش با خطای "Cannot access 'renderer$1'
    // before initialization" کل صفحه رو 500 می‌کنه. غیرفعال کردن باندل
    // سمت سرور، این مسیر باگ‌دار رو کلاً رجیستر نمی‌کنه - آیکون‌ها به‌جاش
    // مستقیم سمت کلاینت لود میشن که برای این پروژه فرقی حس نمیشه.
    icon: {
        serverBundle: false,
    },

    modules: [
        '@nuxt/ui',
        '@formkit/nuxt',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        'nuxt-swiper',
        '@vite-pwa/nuxt',
        // این ماژول توی dev با resolve شدن asset ها (مثل تصاویر توی Header.vue)
        // تداخل پیدا می‌کنه - یه باگ شناخته‌شده که با خطای عجیب
        // "virtual:public...webp 400 Bad Request" خودش رو نشون می‌ده. چون
        // sitemap.xml فقط برای کراولرهای گوگل کاربرد داره، فقط در production
        // لودش می‌کنیم - در dev اصلاً به مشکل نمی‌خوریم چون کلاً غایبه.

    ],

    // صفحات کاملاً شخصی/خصوصی نباید در sitemap.xml باشن یا ایندکس بشن
    sitemap: {
        exclude: ['/profile', '/profile/**', '/auth/**', '/favorites'],
        // یه روت کاملاً معمولی (بدون وابستگی به auto-import مخصوص این ماژول) -
        // فقط زمان build/production واقعاً صدا زده میشه
        sources: ['/api/sitemap-urls'],
    },

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
            htmlAttrs: { lang: 'fa', dir: 'rtl' },
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/pwa-icons/icon.ico' },
                { rel: 'apple-touch-icon', href: '/pwa-icons/apple-touch-icon.png' },
            ],
            meta: [
                { name: 'theme-color', content: '#1B2430' },
                { name: 'mobile-web-app-capable', content: 'yes' },
                { name: 'apple-mobile-web-app-capable', content: 'yes' },
                { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
                { name: 'apple-mobile-web-app-title', content: 'کارپاز' },
                // پیش‌فرض‌های سئو/شبکه‌ی اجتماعی - هر صفحه می‌تونه با useSeoMeta خودش رو override کنه
                { property: 'og:site_name', content: 'کارپاز' },
                { property: 'og:locale', content: 'fa_IR' },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'robots', content: 'index, follow' },
            ],
        }
    },

    // Makes the storefront installable on mobile/desktop (Add to Home Screen)
    // and lets already-visited pages keep working offline.
    // vite-plugin-pwa's dev-mode virtual modules can interfere with Nuxt's
    // own dev-time asset resolution for unrelated <img> tags (a known class
    // of issue). Service workers don't mix well with HMR anyway - test PWA
    // installability via `npm run build && npm run preview`, not `npm run dev`.
    pwa: {
        disable: process.env.NODE_ENV === 'development',
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
