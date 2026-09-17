<script setup>
const { public: { apiBase, siteUrl } } = useRuntimeConfig()
useSeoMeta({
  title: 'قیمت روز خودرو',
  description: 'قیمت روز خودروهای صفر کیلومتر و کارکرده - به‌روزرسانی روزانه',
  ogTitle: 'قیمت روز خودرو | کارپاز',
  ogType: 'website',
})
useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/price-guide` }] })

const condition = ref('')
const q = ref('')
const brand = ref('')
const page = ref(1)

const { data, pending, refresh } = await useFetch(`${apiBase}/price-guide`, {
  query: {
    page,
    condition: computed(() => (condition.value === '' ? undefined : condition.value)),
    q: computed(() => q.value || undefined),
    brand: computed(() => brand.value || undefined),
  },
})

const entries = computed(() => data.value?.data?.entries ?? [])
const brands = computed(() => data.value?.data?.brands ?? [])
const lastUpdate = computed(() => data.value?.data?.last_update)
const links = computed(() => data.value?.data?.meta?.links?.slice(1, -1) ?? [])

let debounceTimer = null
function debouncedRefresh() {
  clearTimeout(debounceTimer)
  page.value = 1
  debounceTimer = setTimeout(refresh, 400)
}

function setCondition(val) {
  condition.value = val
  page.value = 1
  refresh()
}

function paginate(label) {
  page.value = label
  refresh()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function formatPrice(v) {
  if (!v) return '—'
  return new Intl.NumberFormat('fa-IR').format(v) + ' تومان'
}
</script>

<template>
  <LayoutsHeader/>

  <u-container class="py-8">

    <div class="flex flex-col items-center text-center mb-8">
      <span class="inline-flex items-center gap-2 bg-mainColor/10 text-mainColor px-4 py-1.5 rounded-full text-sm font-bold mb-4">
        <CarIcon name="price-tag" class="w-4 h-4"/>
        به‌روزرسانی روزانه
      </span>
      <h1 class="text-3xl md:text-4xl font-extrabold text-secColor mb-2">قیمت روز خودرو</h1>
      <p class="text-gray-500">قیمت بازار و نمایندگی خودروهای صفر کیلومتر و کارکرده</p>
      <p v-if="lastUpdate" class="text-xs text-gray-400 mt-2">آخرین به‌روزرسانی: {{ lastUpdate }}</p>
    </div>

    <!-- تب صفر / کارکرده -->
    <div class="flex justify-center gap-2 mb-6">
      <button @click="setCondition('')"
              class="px-5 py-2 rounded-full text-sm font-bold transition"
              :class="condition === '' ? 'bg-secColor text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'">
        همه
      </button>
      <button @click="setCondition(0)"
              class="px-5 py-2 rounded-full text-sm font-bold transition"
              :class="condition === 0 ? 'bg-mainColor text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'">
        صفر کیلومتر
      </button>
      <button @click="setCondition(1)"
              class="px-5 py-2 rounded-full text-sm font-bold transition"
              :class="condition === 1 ? 'bg-mainColor text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'">
        کارکرده
      </button>
    </div>

    <!-- فیلترها -->
    <div class="grid sm:grid-cols-2 gap-3 mb-6 max-w-2xl mx-auto">
      <input v-model="q" @input="debouncedRefresh" type="text" placeholder="جستجوی برند یا مدل..."
             class="rounded-xl border-2 border-gray-200 focus:border-mainColor px-4 py-2.5 outline-none">
      <select v-model="brand" @change="() => { page = 1; refresh() }"
              class="rounded-xl border-2 border-gray-200 focus:border-mainColor px-4 py-2.5 outline-none bg-white">
        <option value="">همه برندها</option>
        <option v-for="b in brands" :key="b" :value="b">{{ b }}</option>
      </select>
    </div>

    <div v-if="pending" class="text-center py-16">
      <div class="w-8 h-8 border-4 border-mainColor border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>

    <div v-else class="bg-white rounded-2xl shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 text-secColor">
            <tr>
              <th class="p-4 text-right font-bold">برند / مدل</th>
              <th class="p-4 text-right font-bold hidden sm:table-cell">تیریم</th>
              <th class="p-4 text-right font-bold hidden sm:table-cell">سال</th>
              <th class="p-4 text-right font-bold">وضعیت</th>
              <th class="p-4 text-right font-bold">قیمت بازار</th>
              <th class="p-4 text-right font-bold hidden md:table-cell">قیمت نمایندگی</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in entries" :key="item.id" class="border-t border-gray-100 hover:bg-gray-50">
              <td class="p-4 font-bold text-secColor">{{ item.brand }} {{ item.model }}</td>
              <td class="p-4 text-gray-500 hidden sm:table-cell">{{ item.trim || '—' }}</td>
              <td class="p-4 text-gray-500 hidden sm:table-cell">{{ item.year || '—' }}</td>
              <td class="p-4">
                <span class="px-2.5 py-1 rounded-full text-xs font-bold"
                      :class="item.condition === 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'">
                  {{ item.condition_label }}
                </span>
              </td>
              <td class="p-4 font-bold text-mainColor whitespace-nowrap">{{ formatPrice(item.market_price) }}</td>
              <td class="p-4 text-gray-500 hidden md:table-cell whitespace-nowrap">{{ formatPrice(item.agency_price) }}</td>
            </tr>

            <tr v-if="!entries.length">
              <td colspan="6" class="text-center text-gray-400 py-16">موردی یافت نشد</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="links.length" class="flex justify-center gap-1 mt-6">
      <button v-for="(link, i) in links" :key="i" @click="paginate(link.label)"
              class="w-9 h-9 rounded-lg text-sm font-bold transition"
              :class="link.active ? 'bg-mainColor text-white' : 'bg-white text-gray-500 hover:bg-gray-100'">
        {{ link.label }}
      </button>
    </div>

  </u-container>

  <LayoutsFooter/>
</template>
