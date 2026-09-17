<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { numberFormat } from '~/utils/helper'

const thumbsSwiper = ref(null)
const setThumbsSwiper = (swiper) => { thumbsSwiper.value = swiper }

const route = useRoute()
const { public: { apiBase } } = useRuntimeConfig()
const { data: carData, pending } = await useFetch(`${apiBase}/cars/${route.params.slug}`)
const { data: randomCars } = useFetch(`${apiBase}/random-cars?count=4`)
const { authUser } = useAuth()
const toast = useToast()

const car = computed(() => carData.value?.data)

const displayImages = computed(() => {
  const imgs = []
  if (car.value?.primary_image) imgs.push({ image: car.value.primary_image })
  if (car.value?.images?.length) imgs.push(...car.value.images.map(i => ({ image: i.primary_image })))
  return imgs
})

const links = computed(() => [
  { label: 'خانه', to: '/' },
  { label: 'آگهی‌های خودرو', to: '/cars' },
  { label: car.value?.title },
])

// فرم درخواست خرید
const inquirySubmitting = ref(false)
const inquirySent = ref(false)
const inquiryForm = ref({ message: '', preferred_contact_time: '' })

async function submitInquiry() {
  inquirySubmitting.value = true
  try {
    await $fetch('/api/inquiries/create', {
      method: 'POST',
      body: {
        car_id: car.value.id,
        full_name: authUser.value?.name,
        phone: authUser.value?.cellphone,
        ...inquiryForm.value,
      }
    })
    inquirySent.value = true
    toast.add({ title: 'درخواست شما ثبت شد، کارشناس فروش تماس می‌گیرد ✅', color: 'green' })
  } catch (e) {
    toast.add({ title: e.data?.data?.car_id?.[0] || 'خطا در ثبت درخواست', color: 'red' })
  } finally {
    inquirySubmitting.value = false
  }
}

const { public: { siteUrl } } = useRuntimeConfig()

const pageTitle = computed(() => {
  if (!car.value) return route.params.slug
  return `${car.value.title} - ${numberFormat(car.value.effective_price)} تومان`
})
const pageDescription = computed(() => {
  if (!car.value) return undefined
  const base = car.value.description?.trim()
  if (base) return base.slice(0, 160)
  return `${car.value.title} - ${car.value.model_year}، کارکرد ${numberFormat(car.value.mileage_km)} کیلومتر، گیربکس ${car.value.transmission_label}. مشاهده قیمت و مشخصات کامل در کارپاز.`
})
const pageImage = computed(() => car.value?.primary_image ? `${siteUrl}${car.value.primary_image}` : undefined)
const canonicalUrl = computed(() => `${siteUrl}/cars/${route.params.slug}`)

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogImage: pageImage,
  ogType: 'product',
  ogUrl: canonicalUrl,
  twitterCard: 'summary_large_image',
})

useHead(() => ({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
  script: car.value ? [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Vehicle',
        name: car.value.title,
        image: pageImage.value,
        brand: car.value.brand,
        model: car.value.model_name,
        vehicleModelDate: String(car.value.model_year || ''),
        mileageFromOdometer: car.value.mileage_km ? {
          '@type': 'QuantitativeValue', value: car.value.mileage_km, unitCode: 'KMT',
        } : undefined,
        vehicleTransmission: car.value.transmission_label,
        fuelType: car.value.fuel_type_label,
        color: car.value.color,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'IRR',
          price: car.value.effective_price,
          availability: 'https://schema.org/InStock',
          url: canonicalUrl.value,
        },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'خانه', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'آگهی‌های خودرو', item: `${siteUrl}/cars` },
          { '@type': 'ListItem', position: 3, name: car.value.title, item: canonicalUrl.value },
        ],
      }),
    },
  ] : [],
}))
</script>

<template>
  <layouts-header :fixed="true" />
  <u-container>
    <br>
    <UBreadcrumb :links="links" dir="rtl" :ui="{ active: 'text-mainColor font-semibold', base: 'font-light text-gray-400' }" />

    <div v-if="pending" class="grid grid-cols-12 gap-6 my-6 animate-pulse">
      <div class="col-span-12 lg:col-span-6"><div class="rounded-3xl bg-gray-100 aspect-video w-full" /></div>
      <div class="col-span-12 lg:col-span-6 space-y-4">
        <div class="h-8 bg-gray-100 rounded-lg w-3/4" />
        <div class="h-4 bg-gray-100 rounded-lg w-full" />
        <div class="h-4 bg-gray-100 rounded-lg w-5/6" />
      </div>
    </div>

    <div v-else class="grid grid-cols-12 gap-8 my-6">

      <!-- گالری تصاویر -->
      <div class="col-span-12 lg:col-span-6">
        <div class="relative rounded-3xl overflow-hidden shadow-lg ring-1 ring-black/5">
          <Swiper :space-between="10" :thumbs="{ swiper: thumbsSwiper }" :modules="[Thumbs, Navigation]"
                  navigation :loop="true" class="mySwiper2">
            <SwiperSlide v-for="(img, i) in displayImages" :key="i">
              <img :src="img.image" :alt="`${car?.title || 'خودرو'} - تصویر ${i + 1}`" loading="lazy" class="w-full object-cover aspect-video" />
            </SwiperSlide>
          </Swiper>

          <span v-if="car?.condition_value === 1" class="absolute top-4 right-4 z-10 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
            خودروی نو
          </span>
          <CarFavoriteButton :car-id="car?.id" class="!absolute top-4 left-4 z-10" />
        </div>

        <Swiper v-if="displayImages.length > 1" @swiper="setThumbsSwiper" :space-between="12" :slides-per-view="4"
                :watch-slides-progress="true" :modules="[Thumbs]" class="mySwiper mt-3">
          <SwiperSlide v-for="(img, i) in displayImages" :key="i">
            <img :src="img.image" :alt="`${car?.title || 'خودرو'} - تصویر بندانگشتی ${i + 1}`" loading="lazy" class="rounded-xl cursor-pointer border-2 border-transparent opacity-60 hover:opacity-100 transition-all duration-200 object-cover aspect-video" />
          </SwiperSlide>
        </Swiper>

        <p class="text-sm text-gray-500 leading-relaxed mt-6">{{ car?.description }}</p>
      </div>

      <!-- جزئیات و درخواست خرید -->
      <div class="col-span-12 lg:col-span-6">
        <p class="text-xs font-semibold text-mainColor/80 tracking-wide mb-1">{{ car?.brand }} · {{ car?.category }}</p>
        <h1 class="text-2xl md:text-3xl text-secColor py-1 font-extrabold leading-snug">{{ car?.title }}</h1>

        <p class="text-2xl mt-2">
          <span class="text-sporty-num text-mainColor">{{ numberFormat(car?.effective_price) }}</span>
          <span class="text-sm font-medium text-secColor/60 mr-1">تومان</span>
        </p>

        <div class="h-px bg-gray-100 my-5" />

        <!-- مشخصات فنی -->
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          <div class="bg-gray-50 rounded-2xl p-3 text-center">
            <UIcon name="mdi:calendar" class="w-5 h-5 mx-auto text-mainColor mb-1" />
            <p class="text-xs text-gray-400">سال ساخت</p>
            <p class="text-sm font-bold text-secColor">{{ car?.model_year }}</p>
          </div>
          <div class="bg-gray-50 rounded-2xl p-3 text-center">
            <UIcon name="mdi:speedometer" class="w-5 h-5 mx-auto text-mainColor mb-1" />
            <p class="text-xs text-gray-400">کارکرد</p>
            <p class="text-sm font-bold text-secColor">{{ numberFormat(car?.mileage_km) }} کیلومتر</p>
          </div>
          <div class="bg-gray-50 rounded-2xl p-3 text-center">
            <UIcon name="mdi:car-shift-pattern" class="w-5 h-5 mx-auto text-mainColor mb-1" />
            <p class="text-xs text-gray-400">گیربکس</p>
            <p class="text-sm font-bold text-secColor">{{ car?.transmission_label }}</p>
          </div>
          <div class="bg-gray-50 rounded-2xl p-3 text-center">
            <UIcon name="mdi:gas-station" class="w-5 h-5 mx-auto text-mainColor mb-1" />
            <p class="text-xs text-gray-400">سوخت</p>
            <p class="text-sm font-bold text-secColor">{{ car?.fuel_type_label }}</p>
          </div>
          <div class="bg-gray-50 rounded-2xl p-3 text-center">
            <span class="w-5 h-5 mx-auto mb-1 rounded-full inline-block border" :style="{ background: car?.color_code }" />
            <p class="text-xs text-gray-400">رنگ</p>
            <p class="text-sm font-bold text-secColor">{{ car?.color }}</p>
          </div>
          <div class="bg-gray-50 rounded-2xl p-3 text-center">
            <UIcon :name="car?.chassis_healthy && car?.body_healthy ? 'mdi:shield-check' : 'mdi:shield-alert'"
                   class="w-5 h-5 mx-auto mb-1" :class="car?.chassis_healthy && car?.body_healthy ? 'text-emerald-500' : 'text-amber-500'" />
            <p class="text-xs text-gray-400">شاسی و بدنه</p>
            <p class="text-sm font-bold text-secColor">
              {{ car?.chassis_healthy && car?.body_healthy ? 'سالم' : 'دارای آسیب/تعویض' }}
            </p>
          </div>
        </div>

        <div class="h-px bg-gray-100 my-5" />

        <!-- فرم درخواست خرید -->
        <div class="bg-secColor rounded-3xl p-5">
          <h3 class="text-white font-bold mb-1">درخواست بازدید / خرید</h3>
          <p class="text-white/60 text-xs mb-4">اطلاعاتت رو بذار تا کارشناس فروش تماس بگیره - این نمایشگاه پرداخت آنلاین نداره.</p>

          <div v-if="inquirySent" class="bg-emerald-500/20 text-emerald-300 text-sm rounded-xl p-4 text-center">
            درخواستت با موفقیت ثبت شد ✅
          </div>

          <!-- کاربر لاگین نیست: به‌جای فرم، ورود همین‌جا -->
          <AuthGate v-else-if="!authUser" />

          <form v-else @submit.prevent="submitInquiry" class="space-y-3">
            <p class="text-white/50 text-xs bg-white/5 rounded-lg px-3 py-2">
              به نام {{ authUser?.name }} - {{ authUser?.cellphone }}
            </p>
            <input v-model="inquiryForm.preferred_contact_time" type="text" placeholder="بهترین زمان تماس (اختیاری)"
                   class="w-full rounded-xl px-3 py-2.5 text-sm bg-white/10 text-white placeholder:text-white/40 outline-none focus:bg-white/20" />
            <textarea v-model="inquiryForm.message" rows="2" placeholder="توضیحات (اختیاری)"
                      class="w-full rounded-xl px-3 py-2.5 text-sm bg-white/10 text-white placeholder:text-white/40 outline-none focus:bg-white/20 resize-none"></textarea>
            <UButton type="submit" block class="btn-action text-white font-extrabold rounded-xl" :loading="inquirySubmitting">
              ثبت درخواست
            </UButton>
          </form>
        </div>
      </div>
    </div>

    <!-- برگ کارشناسی -->
    <CarInspectionReport v-if="car?.id" :car-id="car.id" />

    <!-- خودروهای مشابه -->
    <div v-if="randomCars?.data?.length" class="my-14">
      <div class="flex items-center gap-3 mb-6">
        <h3 class="text-xl font-extrabold text-secColor">خودروهای مشابه</h3>
        <div class="h-px flex-1 bg-gray-100" />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CarCard v-for="c in randomCars.data" :key="c.id" :car="c" />
      </div>
    </div>
  </u-container>
  <LayoutsFooter />

  <ClientOnly>
    <ChatBot :car="car" />
  </ClientOnly>
</template>

<style>
.mySwiper2 { width: 100%; }
.mySwiper { @apply box-border; }
.swiper-button-next, .swiper-button-prev { @apply text-mainColor; --swiper-navigation-size: 20px; }
.swiper-button-next::after, .swiper-button-prev::after { @apply bg-white/90 rounded-full shadow-md; padding: 20px; font-size: 14px !important; }
.mySwiper .swiper-slide-thumb-active img { @apply border-mainColor opacity-100; }
.mySwiper img { @apply object-cover; }
</style>
