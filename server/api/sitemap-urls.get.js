// یک روت کاملاً معمولی و مستقل - بر خلاف نسخه‌ی قبلی، به هیچ auto-import
// مخصوص ماژول @nuxtjs/sitemap وابسته نیست (defineEventHandler همیشه در
// دسترسه، چه ماژول فعال باشه چه نباشه). ماژول این آدرس رو فقط زمان ساخت
// sitemap.xml صدا می‌زنه - از طریق تنظیم sitemap.sources در nuxt.config.
export default defineEventHandler(async () => {
    const { public: { apiBase } } = useRuntimeConfig()

    try {
        const res = await $fetch(`${apiBase}/cars/sitemap`)
        const cars = res?.data ?? []

        return cars.map((car) => ({
            loc: `/cars/${car.slug}`,
            lastmod: car.updated_at,
        }))
    } catch (e) {
        // اگه بک‌اند موقتاً در دسترس نبود، ساخت کل sitemap نباید fail بشه -
        // فقط این بخش داینامیک خالی می‌مونه، بقیه‌ی مسیرهای استاتیک هنوز میان
        return []
    }
})
