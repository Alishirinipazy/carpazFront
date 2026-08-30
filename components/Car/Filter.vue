<script setup>
const route = useRoute()
const router = useRouter()
const { public: { apiBase } } = useRuntimeConfig()

const { data: options } = await useFetch(`${apiBase}/filter-options`)
const opts = computed(() => options.value?.data ?? {})

function setQuery(patch) {
  const query = { ...route.query, ...patch }
  delete query.page
  Object.keys(query).forEach(k => { if (query[k] === null || query[k] === '' || query[k] === undefined) delete query[k] })
  router.push({ path: '/cars', query })
}

function toggleValue(key, value) {
  setQuery({ [key]: route.query[key] == value ? null : value })
}
</script>

<template>
  <div class="bg-white rounded-2xl border border-gray-100 p-4 space-y-5">

    <div>
      <p class="font-bold text-secColor text-sm mb-2">دسته‌بندی (نوع خودرو)</p>
      <ul class="space-y-1">
        <li v-for="c in opts.categories" :key="c.id">
          <button @click="toggleValue('category', c.id)"
                  class="text-sm w-full text-right py-1 px-2 rounded-lg hover:bg-gray-50"
                  :class="route.query.category == c.id ? 'text-mainColor font-bold' : 'text-secColor'">
            {{ c.name }} <span class="text-gray-300 text-xs">({{ c.car_count }})</span>
          </button>
        </li>
      </ul>
    </div>

    <div class="h-px bg-gray-100"></div>

    <div>
      <p class="font-bold text-secColor text-sm mb-2">برند</p>
      <ul class="space-y-1">
        <li v-for="b in opts.brands" :key="b.id">
          <button @click="toggleValue('brand', b.id)"
                  class="text-sm w-full text-right py-1 px-2 rounded-lg hover:bg-gray-50"
                  :class="route.query.brand == b.id ? 'text-mainColor font-bold' : 'text-secColor'">
            {{ b.name }} <span class="text-gray-300 text-xs">({{ b.car_count }})</span>
          </button>
        </li>
      </ul>
    </div>

    <div class="h-px bg-gray-100"></div>

    <div>
      <p class="font-bold text-secColor text-sm mb-2">وضعیت</p>
      <div class="flex gap-2">
        <button @click="toggleValue('condition', 'new')"
                class="flex-1 text-xs py-2 rounded-xl border"
                :class="route.query.condition === 'new' ? 'bg-secColor text-white border-secColor' : 'border-gray-200 text-secColor'">
          نو
        </button>
        <button @click="toggleValue('condition', 'used')"
                class="flex-1 text-xs py-2 rounded-xl border"
                :class="route.query.condition === 'used' ? 'bg-secColor text-white border-secColor' : 'border-gray-200 text-secColor'">
          کارکرده
        </button>
      </div>
    </div>

    <div class="h-px bg-gray-100"></div>

    <div>
      <p class="font-bold text-secColor text-sm mb-2">گیربکس</p>
      <div class="flex flex-wrap gap-1">
        <button v-for="t in opts.transmissions" :key="t.value" @click="toggleValue('transmission', t.value)"
                class="text-xs px-2.5 py-1.5 rounded-full border"
                :class="route.query.transmission === t.value ? 'bg-secColor text-white border-secColor' : 'border-gray-200 text-secColor'">
          {{ t.label }}
        </button>
      </div>
    </div>

    <div class="h-px bg-gray-100"></div>

    <div>
      <p class="font-bold text-secColor text-sm mb-2">سوخت</p>
      <div class="flex flex-wrap gap-1">
        <button v-for="f in opts.fuel_types" :key="f.value" @click="toggleValue('fuel_type', f.value)"
                class="text-xs px-2.5 py-1.5 rounded-full border"
                :class="route.query.fuel_type === f.value ? 'bg-secColor text-white border-secColor' : 'border-gray-200 text-secColor'">
          {{ f.label }}
        </button>
      </div>
    </div>

    <div class="h-px bg-gray-100"></div>

    <div>
      <p class="font-bold text-secColor text-sm mb-2">رنگ</p>
      <div class="flex flex-wrap gap-2">
        <button v-for="c in opts.colors" :key="c.name" @click="toggleValue('color', c.name)"
                :title="c.name"
                class="w-7 h-7 rounded-full border-2"
                :style="{ background: c.color_code }"
                :class="route.query.color === c.name ? 'border-mainColor scale-110' : 'border-gray-200'">
        </button>
      </div>
    </div>

    <div class="h-px bg-gray-100"></div>

    <div>
      <p class="font-bold text-secColor text-sm mb-2">مرتب‌سازی</p>
      <select class="w-full text-sm border border-gray-200 rounded-xl p-2"
              :value="route.query.sort_by || ''"
              @change="e => setQuery({ sort_by: e.target.value || null })">
        <option value="">جدیدترین</option>
        <option value="min">ارزان‌ترین</option>
        <option value="max">گران‌ترین</option>
        <option value="year_new">جدیدترین مدل</option>
        <option value="mileage">کمترین کارکرد</option>
        <option value="bestseller">پرتقاضاترین</option>
      </select>
    </div>

  </div>
</template>
