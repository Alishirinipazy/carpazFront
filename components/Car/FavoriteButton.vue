<script setup>
const props = defineProps(['carId'])
const favorites = useFavoritesStore()
const toast = useToast()
const router = useRouter()
const loading = ref(false)

const active = computed(() => favorites.isFavorite(props.carId))

async function toggle() {
  if (loading.value) return
  loading.value = true
  try {
    const { needsAuth } = await favorites.toggle(props.carId)
    if (needsAuth) {
      toast.add({ title: 'برای ذخیره‌ی آگهی باید وارد حساب کاربری بشی', color: 'red' })
      return router.push('/auth/login')
    }
    toast.add({
      title: active.value ? 'به علاقه‌مندی‌ها اضافه شد ❤️' : 'از علاقه‌مندی‌ها حذف شد',
      color: 'green'
    })
  } catch {
    toast.add({ title: 'خطایی پیش اومد', color: 'red' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <button @click.prevent.stop="toggle"
          :disabled="loading"
          class="w-9 h-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow hover:bg-white transition">
    <UIcon :name="active ? 'heroicons:heart-solid' : 'heroicons:heart'"
           :class="active ? 'text-cosColor' : 'text-secColor'"
           class="w-5 h-5" />
  </button>
</template>
