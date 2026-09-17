<!--
  نمایش «برگ کارشناسی» یک خودرو در صفحه‌ی جزئیات - اگر برای این خودرو
  گزارشی ثبت نشده باشه، این کامپوننت چیزی رندر نمی‌کنه (خودش رو مخفی می‌کنه).
-->
<script setup>
const props = defineProps({ carId: { type: [Number, String], required: true } })

const { public: { apiBase } } = useRuntimeConfig()
const { data } = await useFetch(`${apiBase}/cars/${props.carId}/inspection`, {
  // 404 وقتی گزارشی نیست کاملا عادیه - نباید در کنسول به چشم بیاد یا صفحه رو خراب کنه
  onResponseError: () => {},
})

const report = computed(() => data.value?.data)

const STATUS_STYLE = {
  healthy: { label: 'سالم', class: 'bg-green-100 text-green-700' },
  issue: { label: 'مشکل دارد', class: 'bg-red-100 text-red-700' },
  painted: { label: 'رنگ‌شدگی', class: 'bg-amber-100 text-amber-700' },
  replaced: { label: 'تعویض‌شدگی', class: 'bg-blue-100 text-blue-700' },
  not_inspected: { label: 'کارشناسی نشده', class: 'bg-gray-100 text-gray-500' },
}

const groupedItems = computed(() => {
  const groups = {}
  for (const item of report.value?.items ?? []) {
    if (!groups[item.category]) groups[item.category] = []
    groups[item.category].push(item)
  }
  return groups
})

const summary = computed(() => {
  const items = report.value?.items ?? []
  const healthy = items.filter(i => i.status === 'healthy').length
  return { total: items.length, healthy }
})

function statusStyle(status) {
  return STATUS_STYLE[status] || STATUS_STYLE.not_inspected
}

// عکس‌های اسکن برگه‌ی کاغذی - مکمل یا جایگزین چک‌لیست بالا
const sheetImages = computed(() => report.value?.sheet_images ?? [])
const lightboxUrl = ref(null)
</script>

<template>
  <section v-if="report" class="my-10">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-xl bg-mainColor/10 flex items-center justify-center shrink-0">
        <CarIcon name="clipboard-check" class="w-5 h-5 text-mainColor" />
      </div>
      <div>
        <h3 class="text-xl font-extrabold text-secColor">برگ کارشناسی خودرو</h3>
        <p v-if="summary.total" class="text-xs text-gray-400">
          {{ summary.healthy }} مورد سالم از {{ summary.total }} مورد بررسی‌شده
        </p>
      </div>
    </div>

    <!-- اطلاعات کلی گزارش -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <div v-if="report.expert_name" class="bg-gray-50 rounded-2xl p-3 text-center">
        <p class="text-xs text-gray-400 mb-1">کارشناس</p>
        <p class="text-sm font-bold text-secColor">{{ report.expert_name }}</p>
      </div>
      <div v-if="report.inspection_date" class="bg-gray-50 rounded-2xl p-3 text-center">
        <p class="text-xs text-gray-400 mb-1">تاریخ کارشناسی</p>
        <p class="text-sm font-bold text-secColor">{{ report.inspection_date }}</p>
      </div>
      <div v-if="report.mileage_km" class="bg-gray-50 rounded-2xl p-3 text-center">
        <p class="text-xs text-gray-400 mb-1">کارکرد ثبت‌شده</p>
        <p class="text-sm font-bold text-secColor">{{ new Intl.NumberFormat('fa-IR').format(report.mileage_km) }} کیلومتر</p>
      </div>
      <div v-if="report.suggested_price" class="bg-gray-50 rounded-2xl p-3 text-center">
        <p class="text-xs text-gray-400 mb-1">قیمت پیشنهادی کارشناس</p>
        <p class="text-sm font-bold text-mainColor">{{ new Intl.NumberFormat('fa-IR').format(report.suggested_price) }} تومان</p>
      </div>
    </div>

    <!-- چک‌لیست بخش‌ها -->
    <div v-if="Object.keys(groupedItems).length" class="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 divide-y divide-gray-100">
      <div v-for="(items, category) in groupedItems" :key="category" class="p-5">
        <h4 class="font-bold text-secColor mb-3">{{ category }}</h4>
        <div class="grid sm:grid-cols-2 gap-2">
          <div v-for="(item, i) in items" :key="i" class="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2.5">
            <span class="text-sm text-gray-600">{{ item.label }}</span>
            <span class="text-xs font-bold px-2.5 py-1 rounded-full" :class="statusStyle(item.status).class">
              {{ statusStyle(item.status).label }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- عکس‌های اسکن برگه‌ی کاغذی -->
    <div v-if="sheetImages.length" class="mt-6">
      <h4 class="font-bold text-secColor mb-3">تصویر برگه کارشناسی</h4>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          v-for="img in sheetImages"
          :key="img.filename"
          type="button"
          class="aspect-[4/3] rounded-xl overflow-hidden ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-mainColor"
          @click="lightboxUrl = img.url"
        >
          <img :src="img.url" alt="برگه کارشناسی خودرو" class="w-full h-full object-cover" loading="lazy">
        </button>
      </div>
    </div>

    <p v-if="report.description" class="text-sm text-gray-500 leading-7 mt-4 bg-gray-50 rounded-2xl p-4">
      {{ report.description }}
    </p>

    <!-- نمایش بزرگ‌شده‌ی عکس -->
    <div
      v-if="lightboxUrl"
      class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      @click="lightboxUrl = null"
    >
      <img :src="lightboxUrl" alt="برگه کارشناسی خودرو" class="max-w-full max-h-full rounded-xl">
    </div>
  </section>
</template>
