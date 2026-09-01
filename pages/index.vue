<script setup lang="ts">
const { public: { apiBase } } = useRuntimeConfig()
const { data: carsMeta } = await useFetch(`${apiBase}/cars`)
const { data: filterOptions } = await useFetch(`${apiBase}/filter-options`)
const { data: brandsData } = await useFetch(`${apiBase}/brands`)
const { data: menu } = await useFetch(`${apiBase}/menu`)

const brands = computed(() => (brandsData.value?.data ?? filterOptions.value?.data?.brands ?? []).slice(0, 8))
const cars = computed(() => menu.value?.data?.cars ?? [])
const stats = computed(() => [
  { value: carsMeta.value?.data?.meta?.total ?? 0, label: 'خودروی موجود' },
  { value: brands.value.length, label: 'برند فعال' },
  { value: filterOptions.value?.data?.categories?.length ?? 0, label: 'نوع خودرو' },
  { value: '۹۸٪', label: 'رضایت مشتری' },
])

const reasons = [
  { icon: 'mdi:shield-check-outline', title: 'خرید مطمئن', text: 'اطلاعات خودرو و شرایط خرید را شفاف و قابل اعتماد در اختیارت می‌گذاریم.' },
  { icon: 'mdi:diamond-stone', title: 'خودروهای منتخب', text: 'خودروها با دقت انتخاب می‌شوند تا راحت‌تر به گزینه مناسب برسی.' },
  { icon: 'mdi:tag-check-outline', title: 'قیمت‌گذاری شفاف', text: 'قیمت‌ها بدون هزینه پنهان و متناسب با شرایط بازار ارائه می‌شوند.' },
  { icon: 'mdi:headset', title: 'پشتیبانی تخصصی', text: 'برای انتخاب، بررسی و خرید خودرو، کارشناسان کنار تو هستند.' },
]

const posts = [
  { image: '/images/img_2.png', tag: 'راهنمای خرید', title: 'قبل از خرید خودروی کارکرده به این نکات توجه کن' },
  { image: '/images/abote.png', tag: 'کارشناسی', title: 'چطور یک خودروی مناسب را سریع‌تر پیدا کنیم؟' },
  { image: '/images/alipaz.png', tag: 'اخبار خودرو', title: 'راهنمای قیمت‌گذاری خودرو در بازار امروز' },
]

useHead({ title: 'کارپاز | خرید و فروش خودرو' })
</script>

<template>
  <div dir="rtl" class="home-page bg-white text-secColor">
    <LayoutsHeader />

    <section class="hero relative min-h-[650px] overflow-hidden bg-secColor">
      <img src="/images/img_2.png" alt="خودرو" class="absolute inset-0 h-full w-full object-cover opacity-75" />
      <div class="absolute inset-0 bg-gradient-to-b from-secColor/70 via-secColor/40 to-secColor"></div>
      <UContainer class="relative z-10 flex min-h-[650px] flex-col items-center justify-center px-4 pb-24 pt-28 text-center">
        <p class="mb-3 text-sm font-bold text-mainColor">انتخاب هوشمندانه، خرید مطمئن</p>
        <h1 class="max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">خودروی مناسب خودت را پیدا کن</h1>
        <p class="mt-5 max-w-xl text-sm leading-7 text-white/75 md:text-base">بین آگهی‌های خودرو جستجو کن، مقایسه کن و با خیال راحت انتخابت را انجام بده.</p>
        <HomeSearchBar class="mt-9 w-full max-w-4xl" />
        <div class="mt-6 flex flex-wrap justify-center gap-2">
          <NuxtLink to="/cars" class="hero-pill">خودروهای موجود</NuxtLink>
          <NuxtLink to="/cars?condition=1" class="hero-pill">خودروهای نو</NuxtLink>
          <NuxtLink to="/cars" class="hero-pill">کم‌کارها</NuxtLink>
          <NuxtLink to="/cars" class="hero-pill">پیشنهادهای ویژه</NuxtLink>
        </div>
      </UContainer>
    </section>

    <main>
      <UContainer class="py-14 md:py-16">
        <div class="section-head">
          <div><p class="section-kicker">BRANDS</p><h2 class="section-title">برندهای محبوب</h2></div>
          <NuxtLink to="/cars" class="section-link">مشاهده همه ←</NuxtLink>
        </div>
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          <NuxtLink v-for="brand in brands" :key="brand.id" :to="`/cars?brand=${brand.id}`" class="brand-card">
            <img v-if="brand.logo" :src="brand.logo" :alt="brand.name" class="h-10 w-16 object-contain" />
            <UIcon v-else name="mdi:car-outline" class="h-9 w-9 text-secColor" />
            <span>{{ brand.name }}</span>
          </NuxtLink>
        </div>
      </UContainer>

      <section class="border-y border-gray-100 bg-gray-50/70">
        <UContainer class="py-14 md:py-16">
          <div class="section-head">
            <div><p class="section-kicker">INVENTORY</p><h2 class="section-title">همه خودروها را ببین</h2></div>
            <NuxtLink to="/cars" class="section-link">مشاهده همه ←</NuxtLink>
          </div>
          <HomeTab />
        </UContainer>
      </section>

      <UContainer class="py-14 md:py-16">
        <div class="overflow-hidden rounded-[28px] bg-[#eef2ff]">
          <div class="grid md:grid-cols-2">
            <div class="relative min-h-[310px] overflow-hidden">
              <img src="/images/img_2.png" alt="فروش خودرو" class="absolute inset-0 h-full w-full object-cover" />
              <div class="absolute inset-0 bg-secColor/25"></div>
              <span class="absolute inset-0 flex items-center justify-center"><span class="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl"><UIcon name="mdi:play" class="h-6 w-6 text-secColor" /></span></span>
            </div>
            <div class="flex flex-col justify-center p-7 md:p-12">
              <p class="section-kicker">SELL YOUR CAR</p>
              <h2 class="text-2xl font-black leading-10 text-secColor md:text-3xl">قیمت واقعی خودروی خودت را پیدا کن</h2>
              <p class="mt-4 text-sm leading-7 text-gray-500">مشخصات خودرو را برای ما ارسال کن تا برای فروش و قیمت‌گذاری راهنماییت کنیم.</p>
              <ul class="mt-5 space-y-3 text-sm text-gray-600">
                <li class="flex items-center gap-2"><UIcon name="mdi:check-circle" class="text-mainColor" /> کارشناسی و بررسی دقیق</li>
                <li class="flex items-center gap-2"><UIcon name="mdi:check-circle" class="text-mainColor" /> پیشنهاد قیمت شفاف</li>
                <li class="flex items-center gap-2"><UIcon name="mdi:check-circle" class="text-mainColor" /> پشتیبانی تا پایان معامله</li>
              </ul>
              <NuxtLink to="/contact" class="mt-7 inline-flex w-fit"><UButton color="yellow" class="rounded-xl px-6 font-bold">فروش خودرو</UButton></NuxtLink>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-5 py-10 md:grid-cols-4">
          <div v-for="stat in stats" :key="stat.label" class="text-center"><p class="text-2xl font-black md:text-3xl">{{ stat.value }}</p><p class="mt-1 text-xs text-gray-400">{{ stat.label }}</p></div>
        </div>
      </UContainer>

      <section class="border-y border-gray-100">
        <UContainer class="py-14 md:py-16">
          <div class="mb-9"><p class="section-kicker">WHY CARPAZ</p><h2 class="section-title">چرا کارپاز؟</h2></div>
          <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="reason in reasons" :key="reason.title">
              <div class="reason-icon"><UIcon :name="reason.icon" class="h-6 w-6" /></div>
              <h3 class="mt-4 font-extrabold">{{ reason.title }}</h3>
              <p class="mt-2 text-xs leading-6 text-gray-400">{{ reason.text }}</p>
            </div>
          </div>
        </UContainer>
      </section>

      <section class="bg-secColor">
        <UContainer class="py-14 md:py-16">
          <div class="section-head"><div><p class="section-kicker">POPULAR</p><h2 class="text-2xl font-black text-white md:text-3xl">خودروهای پرطرفدار</h2></div><NuxtLink to="/cars" class="section-link">مشاهده همه ←</NuxtLink></div>
          <div v-if="cars.length" class="grid gap-4 md:grid-cols-2 lg:grid-cols-4"><CarCard v-for="car in cars.slice(0, 4)" :key="car.id" :car="car" /></div>
          <div v-else class="rounded-2xl border border-white/10 py-12 text-center text-sm text-white/50">خودرویی برای نمایش وجود ندارد.</div>
        </UContainer>
      </section>

      <UContainer class="py-14 md:py-16">
        <div class="section-head"><div><p class="section-kicker">SHOP BY MAKE</p><h2 class="section-title">خودرو را بر اساس برند پیدا کن</h2></div><NuxtLink to="/cars" class="section-link">مشاهده همه ←</NuxtLink></div>
        <div class="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
          <NuxtLink v-for="brand in brands.slice(0, 8)" :key="brand.id" :to="`/cars?brand=${brand.id}`" class="make-link">{{ brand.name }} <span>←</span></NuxtLink>
        </div>
      </UContainer>

      <section class="bg-gray-50">
        <UContainer class="py-14 md:py-16">
          <div class="section-head"><div><p class="section-kicker">TESTIMONIALS</p><h2 class="section-title">مشتری‌های ما چه می‌گویند؟</h2></div><span class="hidden text-xs text-gray-400 md:block">تجربه واقعی مشتریان کارپاز</span></div>
          <div class="grid items-center gap-8 md:grid-cols-[180px_1fr]">
            <img src="/images/alipaz.png" alt="مشتری کارپاز" class="mx-auto h-44 w-44 rounded-2xl object-cover" />
            <div><div class="mb-3 text-mainColor">★★★★★</div><p class="text-sm leading-8 text-gray-600 md:text-base">تجربه خرید برای من خیلی راحت‌تر از چیزی بود که فکر می‌کردم. اطلاعات خودرو کامل بود و تیم کارپاز در تمام مراحل پاسخگو بود.</p><p class="mt-5 font-extrabold">مشتری کارپاز</p><p class="mt-1 text-xs text-gray-400">خریدار خودرو</p></div>
          </div>
        </UContainer>
      </section>

      <UContainer class="py-14 md:py-16">
        <div class="section-head"><div><p class="section-kicker">BLOG</p><h2 class="section-title">آخرین مطالب خودرو</h2></div><NuxtLink to="/about" class="section-link">مشاهده همه ←</NuxtLink></div>
        <div class="grid gap-5 md:grid-cols-3">
          <article v-for="post in posts" :key="post.title" class="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <img :src="post.image" :alt="post.title" class="h-48 w-full object-cover" />
            <div class="p-5"><span class="text-[11px] font-bold text-mainColor">{{ post.tag }}</span><h3 class="mt-2 font-extrabold leading-7">{{ post.title }}</h3><span class="mt-4 inline-flex text-xs font-bold text-gray-400">ادامه مطلب ←</span></div>
          </article>
        </div>
      </UContainer>

      <UContainer class="pb-14 md:pb-16">
        <div class="grid gap-5 md:grid-cols-2">
          <div class="cta-card bg-[#edf4ff]"><div><p class="text-xs font-bold text-mainColor">خریدار خودرو هستی؟</p><h3 class="mt-2 text-xl font-black">خودروی بعدی‌ات منتظر توست</h3><p class="mt-2 text-xs leading-6 text-gray-500">بین آگهی‌ها جستجو کن و گزینه مناسب خودت را پیدا کن.</p><NuxtLink to="/cars" class="mt-5 inline-flex"><UButton color="yellow" class="rounded-xl font-bold">جستجوی خودرو</UButton></NuxtLink></div><UIcon name="mdi:car-search" class="h-14 w-14 shrink-0 text-mainColor" /></div>
          <div class="cta-card bg-[#fff0f5]"><div><p class="text-xs font-bold text-mainColor">قصد فروش داری؟</p><h3 class="mt-2 text-xl font-black">خودروتو به کارپاز بسپار</h3><p class="mt-2 text-xs leading-6 text-gray-500">برای فروش و قیمت‌گذاری خودرو با ما در تماس باش.</p><NuxtLink to="/contact" class="mt-5 inline-flex"><UButton color="yellow" class="rounded-xl font-bold">فروش خودرو</UButton></NuxtLink></div><UIcon name="mdi:cash-check" class="h-14 w-14 shrink-0 text-mainColor" /></div>
        </div>
      </UContainer>
    </main>

    <LayoutsFooter />
    <ClientOnly><ChatBot /></ClientOnly>
  </div>
</template>

<style scoped>
.home-page { --main: #ffbe33; --secondary: #222831; }
.section-head { display:flex; align-items:flex-end; justify-content:space-between; gap:1rem; margin-bottom:1.75rem; }
.section-kicker { margin-bottom:4px; font-size:10px; font-weight:800; letter-spacing:.18em; color:var(--main); }
.section-title { font-size:1.55rem; font-weight:900; line-height:1.8; color:var(--secondary); }
.section-link { flex-shrink:0; font-size:.75rem; font-weight:800; color:var(--main); }
.hero-pill { border:1px solid rgba(255,255,255,.16); border-radius:999px; padding:7px 14px; background:rgba(255,255,255,.08); color:rgba(255,255,255,.9); font-size:11px; backdrop-filter:blur(10px); transition:.2s; }
.hero-pill:hover { border-color:var(--main); background:rgba(255,190,51,.16); }
.brand-card { min-height:112px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; border:1px solid #edf0f3; border-radius:12px; background:#fff; transition:.2s; }
.brand-card span { max-width:90%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:11px; color:#4b5563; }
.brand-card:hover { border-color:var(--main); transform:translateY(-2px); box-shadow:0 10px 25px rgba(34,40,49,.07); }
.reason-icon { display:inline-flex; width:46px; height:46px; align-items:center; justify-content:center; border-radius:14px; color:var(--main); background:rgba(255,190,51,.12); }
.make-link { display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #edf0f3; padding:9px 0; font-size:12px; color:#4b5563; transition:.2s; }
.make-link span { color:var(--main); }
.make-link:hover { color:var(--secondary); padding-inline:5px; }
.cta-card { display:flex; min-height:210px; align-items:center; justify-content:space-between; gap:20px; overflow:hidden; border-radius:20px; padding:28px; }
@media (max-width:640px) { .section-title { font-size:1.3rem; } .hero { min-height:590px; } }
</style>
