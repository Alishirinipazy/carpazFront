<script setup lang="ts">
const { public: { apiBase } } = useRuntimeConfig()
const { data } = await useFetch(`${apiBase}/filter-options`)
const categories = computed(() => data.value?.data?.categories ?? [])

// آیکون تقریبی بر اساس نام دسته‌بندی - چون اسم دسته‌ها توسط ادمین آزادانه
// ثبت می‌شه، اینجا فقط حدس می‌زنیم و در نبود تطابق آیکون عمومی خودرو می‌ذاریم
const ICONS = [
  { match: /شاسی|suv/i, icon: 'mdi:car-estate' },
  { match: /سدان|sedan/i, icon: 'mdi:car' },
  { match: /هاچ|hatch/i, icon: 'mdi:car-hatchback' },
  { match: /کوپه|coupe/i, icon: 'mdi:car-sports' },
  { match: /ون|van/i, icon: 'mdi:van-passenger' },
  { match: /وانت|pickup|truck/i, icon: 'mdi:truck-pickup' },
  { match: /برقی|electric/i, icon: 'mdi:car-electric' },
  { match: /هیبرید|hybrid/i, icon: 'mdi:leaf' },
]
function iconFor(name) {
  return ICONS.find(i => i.match.test(name))?.icon ?? 'mdi:car'
}
</script>

<template>
  <section class="my-8">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-extrabold text-secColor">جستجو بر اساس نوع خودرو</h2>
      <NuxtLink to="/cars" class="text-mainColor text-sm font-bold flex items-center gap-1">
        مشاهده همه
        <UIcon name="material-symbols:arrow-circle-left-outline-rounded" />
      </NuxtLink>
    </div>

    <div class="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-8 gap-3">
      <NuxtLink v-for="c in categories" :key="c.id" :to="`/cars?category=${c.id}`"
                class="flex flex-col items-center gap-2 p-4 rounded-2xl border border-gray-100 hover:border-mainColor hover:shadow-md transition-all">
        <img v-if="c.image" :src="c.image" class="w-9 h-9 object-cover rounded-lg" :alt="c.name" />
        <UIcon v-else :name="iconFor(c.name)" class="w-7 h-7 text-secColor" />
        <span class="text-xs text-gray-500 truncate w-full text-center">{{ c.name }}</span>
      </NuxtLink>
    </div>
  </section>
</template>
