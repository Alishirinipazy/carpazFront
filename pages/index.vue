<script setup lang="ts">
const { public: { apiBase } } = useRuntimeConfig()

const { data: carsMeta } = await useFetch(`${apiBase}/cars`)
const { data: filterOptions } = await useFetch(`${apiBase}/filter-options`)

const stats = computed(() => [
  { label: 'خودروی موجود', value: carsMeta.value?.data?.meta?.total ?? 0 },
  { label: 'برند فعال', value: filterOptions.value?.data?.brands?.length ?? 0 },
  { label: 'نوع بدنه', value: filterOptions.value?.data?.categories?.length ?? 0 },
  { label: 'رضایت مشتری', value: '۹۸٪' },
])

const bannerItemData = ref([
  { image: '/images/img_2.png', title: 'دنبال خودرو می‌گردی؟', dis: 'از بین صدها آگهی نو و کارکرده، خودروی مناسبت رو پیدا کن.', link: '/cars' },
  { image: '/images/abote.png', title: 'می‌خوای خودروتو بفروشی؟', dis: 'با کارشناسای فروش ما در تماس باش تا بهترین پیشنهاد رو بگیری.', link: '/contact' },
])

const { public: { siteUrl } } = useRuntimeConfig()

useSeoMeta({
  title: 'کارپاز | خرید و فروش خودرو نو و کارکرده',
  description: 'خرید و فروش خودرو نو و کارکرده با کارشناسی رایگان، قیمت روز شفاف و تحویل سریع - فروش ماشین شما در کمتر از یک روز.',
  ogTitle: 'کارپاز | خرید و فروش خودرو نو و کارکرده',
  ogDescription: 'خرید و فروش خودرو نو و کارکرده با کارشناسی رایگان و قیمت روز شفاف.',
  ogImage: `${siteUrl}/images/logo.webp`,
  ogUrl: siteUrl,
  ogType: 'website',
  ogSiteName: 'کارپاز',
  twitterCard: 'summary_large_image',
  twitterTitle: 'کارپاز | خرید و فروش خودرو نو و کارکرده',
  twitterDescription: 'خرید و فروش خودرو نو و کارکرده با کارشناسی رایگان و قیمت روز شفاف.',
  twitterImage: `${siteUrl}/images/logo.webp`,
})

// Organization + WebSite schema (JSON-LD دستی، بدون وابستگی اضافه) - به گوگل
// کمک می‌کنه لوگو/نام سایت رو در نتایج جستجو درست نشون بده و باکس جستجوی
// سایت‌لینکس (sitelinks search box) رو فعال کنه
useHead({
  link: [{ rel: 'canonical', href: siteUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AutomotiveBusiness',
        name: 'کارپاز',
        url: siteUrl,
        logo: `${siteUrl}/images/logo.webp`,
        image: `${siteUrl}/images/logo.webp`,
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'کارپاز',
        url: siteUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteUrl}/cars?search={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }),
    },
  ],
})
</script>

<template>
  <LayoutsHeader />

  <!-- هیرو -->
  <section class="relative  pt-32 pb-24 px-4 overflow-hidden bg-[url(/images/back.jpg)] bg-cover bg-bottom">
    <div class="absolute inset-0 bg-gradient-to-b from-black/10 to-secColor opacity-90"></div>
    <div class="relative z-10 text-center max-w-2xl mx-auto">
      <p class="text-mainColor text-sm font-bold mb-3">راحت‌ترین راه پیدا کردن خودروی مناسب</p>
      <h1 class="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
        کمتر جستجو کن، بیشتر رانندگی کن
      </h1>
      <div class="flex justify-center gap-3 mb-10">
        <NuxtLink to="/cars">
          <UButton class="btn-action rounded-full text-white px-6">مشاهده موجودی</UButton>
        </NuxtLink>
        <NuxtLink to="/contact">
          <UButton variant="outline" color="white" class="rounded-full font-bold px-6 text-white border-white/40">تماس با ما</UButton>
        </NuxtLink>
      </div>
    </div>
    <div class="relative z-10">
      <HomeSearchBar />
    </div>
  </section>

  <UContainer>
    <HomeBrandTypes />
    <HomeTab />
    <HomeCategoryTypes />


    <!-- آمار -->
    <section class="grid grid-cols-2 lg:grid-cols-4 gap-4 my-10">
      <div v-for="s in stats" :key="s.label" class="bg-gray-50 rounded-2xl text-center py-6">
        <p class="text-2xl font-extrabold text-secColor">{{ s.value }}</p>
        <p class="text-xs text-gray-400 mt-1">{{ s.label }}</p>
      </div>
    </section>

    <HomeBanner :dataBanner="bannerItemData" />


  </UContainer>

  <!-- چرا ما رو انتخاب کنی -->
  <section class="bg-mainColor mt-10">
    <UContainer class="py-14">
      <h2 class="text-white text-2xl font-extrabold mb-8">چرا ما رو انتخاب کنی؟</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <UIcon name="mdi:cash-multiple" class="w-8 h-8 text-white mb-2" />
          <h4 class="text-white font-bold mb-1">تسهیلات ویژه‌ی خرید</h4>
          <p class="text-white/70 text-sm">کارشناسان مالی ما راه‌حل مناسب مالی برات پیدا می‌کنن.</p>
        </div>
        <div>
          <UIcon name="mdi:certificate" class="w-8 h-8 text-white mb-2" />
          <h4 class="text-white font-bold mb-1">نمایشگاه مورد اعتماد</h4>
          <p class="text-white/70 text-sm">هر خودرو قبل از عرضه، بازرسی فنی می‌شه.</p>
        </div>
        <div>
          <UIcon name="mdi:tag-outline" class="w-8 h-8 text-white mb-2" />
          <h4 class="text-white font-bold mb-1">قیمت‌گذاری شفاف</h4>
          <p class="text-white/70 text-sm">بدون هزینه‌ی پنهان، قیمت واقعی بازار.</p>
        </div>
        <div>
          <UIcon name="mdi:car-wrench" class="w-8 h-8 text-white mb-2" />
          <h4 class="text-white font-bold mb-1">خدمات تخصصی خودرو</h4>
          <p class="text-white/70 text-sm">تیم فنی ما همیشه در کنارته.</p>
        </div>
      </div>
    </UContainer>
  </section>

  <LayoutsFooter />

  <ClientOnly>
    <ChatBot />
  </ClientOnly>
</template>
