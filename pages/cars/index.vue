<script setup lang="ts">
const { public: { apiBase } } = useRuntimeConfig();
const query = ref({});
const route = useRoute();
const isOpen = ref(false)

const { data: menu, pending: pendingMenu, refresh } = await useFetch(() => `${apiBase}/menu`, {
  query: query
});

const { data: filterOptions } = await useFetch(`${apiBase}/filter-options`)

watch(route, () => {
  query.value = route.query
  isOpen.value = false
  refresh()
})

const links = [
  { label: 'خانه', to: '/' },
  { label: 'آگهی‌های خودرو', to: '/cars' }
]

const { public: { siteUrl } } = useRuntimeConfig()

// عنوان/توضیحات داینامیک بر اساس فیلترهای فعال - برای اینکه صفحات فیلترشده
// (مثلاً /cars?brand=3) هم عنوان اختصاصی و معنادار توی گوگل داشته باشن،
// نه یک عنوان ثابت یکسان برای همه‌ی حالت‌ها
const brandName = computed(() => {
  const id = route.query.brand
  if (!id) return null
  return filterOptions.value?.data?.brands?.find(b => String(b.id) === String(id))?.name
})
const categoryName = computed(() => {
  const id = route.query.category
  if (!id) return null
  return filterOptions.value?.data?.categories?.find(c => String(c.id) === String(id))?.name
})
const searchTerm = computed(() => route.query.search || null)

const pageTitle = computed(() => {
  const parts = []
  if (searchTerm.value) parts.push(`جستجوی «${searchTerm.value}»`)
  if (brandName.value) parts.push(`خودرو ${brandName.value}`)
  if (categoryName.value) parts.push(categoryName.value)
  if (route.query.condition === 'new') parts.push('خودروی نو')
  if (route.query.condition === 'used') parts.push('خودروی کارکرده')
  if (!parts.length) return 'آگهی‌های خودرو نو و کارکرده | کارپاز'
  return `${parts.join(' ')} | کارپاز`
})
const pageDescription = computed(() => {
  const total = menu.value?.data?.meta?.total
  const base = brandName.value
    ? `خرید خودرو ${brandName.value}${categoryName.value ? ' ' + categoryName.value : ''} با کارشناسی رایگان و قیمت روز شفاف.`
    : 'مرور و فیلتر صدها آگهی خودروی نو و کارکرده بر اساس برند، قیمت، کارکرد و سال ساخت.'
  return total ? `${base} در حال حاضر ${total} آگهی موجود است.` : base
})
const canonicalUrl = computed(() => `${siteUrl}/cars`)

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogImage: `${siteUrl}/images/logo.webp`,
  ogUrl: canonicalUrl,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

useHead(() => ({
  // فیلترها/جستجو تکرار همون محتوا با URL متفاوته - همه رو به /cars اصلی
  // canonical می‌کنیم تا گوگل محتوای تکراری ایندکس نکنه
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
  script: menu.value?.data?.cars?.length ? [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: menu.value.data.cars.map((car, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${siteUrl}/cars/${car.slug}`,
          name: car.title,
        })),
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'خانه', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'آگهی‌های خودرو', item: canonicalUrl.value },
        ],
      }),
    },
  ] : [],
}))
</script>

<template>
  <LayoutsHeader />

  <div class="bg-secColor pt-28 pb-10">
    <UContainer>
      <h1 class="text-white text-2xl font-extrabold">آگهی‌های خودرو</h1>
      <UBreadcrumb dir="rtl" :links="links" class="mt-2" :ui="{ active: 'text-mainColor', base: 'font-light text-gray-300' }" />
    </UContainer>
  </div>

  <UContainer>
    <div class="flex flex-row-reverse center justify-between w-full items-center py-3 lg:hidden">
      <button @click="isOpen = true" class="rounded-xl text-sm bg-secColor text-white px-3 py-2 flex items-center gap-1">
        <UIcon name="material-symbols:filter-alt-sharp" />
        فیلترها
      </button>
      <p class=" text-gray-400   " v-if="menu?.data?.meta?.total">
        {{ menu.data.meta.total }} خودرو یافت شد
      </p>
    </div>

    <USlideover v-model="isOpen">
      <UCard class="flex flex-col flex-1">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-bold">فیلترها</h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="isOpen = false" />
          </div>
        </template>
        <CarFilter />
      </UCard>
    </USlideover>

    <div class="grid lg:grid-cols-12 gap-4 items-start py-4">
      <div class="hidden lg:block lg:col-span-3">
        <CarFilter />
      </div>

      <div class="col-span-12 lg:col-span-9">

        <p class="text-sm text-gray-400 mb-3 hidden md:block" v-if="menu?.data?.meta?.total">
          {{ menu.data.meta.total }} خودرو یافت شد
        </p>
        <div v-if="!pendingMenu && menu?.data?.cars?.length" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <CarCard v-for="car in menu.data.cars" :key="car.id" :car="car" />
        </div>

        <div v-else-if="pendingMenu" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <GlobalLoaderMenu v-for="n in 6" :key="n" />
        </div>

        <div v-else class="text-center py-20 text-gray-400">
          <p class="text-4xl mb-2">🚗</p>
          <p>خودرویی با این مشخصات پیدا نشد</p>
        </div>

        <GlobalPagination :pages="menu?.data?.meta?.links" />
      </div>
    </div>
  </UContainer>

  <LayoutsFooter />
</template>
