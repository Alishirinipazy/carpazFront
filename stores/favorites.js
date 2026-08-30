// جایگزین stores/cart.js قدیمی. توی این فروشگاه خودرو، هر آگهی یه واحد
// یکتاست و پرداخت آنلاین/سبد خرید وجود نداره - فقط یه لیست «علاقه‌مندی‌ها»
// (ذخیره برای بعد) و ثبت درخواست خرید (inquiry) داریم.
export const useFavoritesStore = defineStore('favorites', () => {
    const items = ref([]) // [{ id, car_id, car_title, car_slug, car_image, price }]
    const loaded = ref(false)

    const ids = computed(() => new Set(items.value.map(i => i.car_id)))

    function isFavorite(carId) {
        return ids.value.has(carId)
    }

    async function fetchAll() {
        try {
            const data = await $fetch('/api/favorites')
            items.value = data ?? []
        } catch {
            // مهمان یا خطای شبکه - لیست خالی می‌مونه
            items.value = []
        } finally {
            loaded.value = true
        }
    }

    async function toggle(carId) {
        const { authUser } = useAuth()
        if (!authUser.value) return { needsAuth: true }

        if (isFavorite(carId)) {
            await $fetch(`/api/favorites/remove?carId=${carId}`, { method: 'DELETE' })
            items.value = items.value.filter(i => i.car_id !== carId)
        } else {
            const created = await $fetch('/api/favorites/add', {
                method: 'POST',
                body: { car_id: carId }
            })
            items.value.push(created)
        }
        return { needsAuth: false }
    }

    return { items, loaded, isFavorite, fetchAll, toggle }
})
