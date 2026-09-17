<script setup>
const { public: { siteUrl } } = useRuntimeConfig()
useSeoMeta({
  title: 'ارتباط با ما',
  description: 'سوال، پیشنهاد یا انتقادی دارید؟ کارپاز همیشه در دسترسه.',
  ogTitle: 'ارتباط با کارپاز',
  ogType: 'website',
})
useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/contact` }] })

const toast = useToast()

const form = ref({ name: '', email: '', subject: '', text: '' })
const errors = ref({})
const loading = ref(false)
const submitted = ref(false)

function validate() {
  const e = {}
  if (!form.value.name.trim()) e.name = 'نام را وارد کنید'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) e.email = 'ایمیل معتبر نیست'
  if (!form.value.subject.trim()) e.subject = 'موضوع را وارد کنید'
  if (!form.value.text.trim()) e.text = 'متن پیام را وارد کنید'
  errors.value = e
  return Object.keys(e).length === 0
}

async function submit() {
  if (!validate()) return
  loading.value = true
  try {
    await $fetch('/api/contact-us/create', { method: 'POST', body: form.value })
    submitted.value = true
    toast.add({ title: 'پیام شما با موفقیت ارسال شد', color: 'green' })
  } catch (error) {
    toast.add({ title: error?.data?.data?.message || 'مشکلی پیش اومد، دوباره امتحان کن', color: 'red' })
  } finally {
    loading.value = false
  }
}

function resetForm() {
  form.value = { name: '', email: '', subject: '', text: '' }
  errors.value = {}
  submitted.value = false
}

const infoCards = [
  { icon: 'pin', title: 'آدرس نمایشگاه', text: 'فعلا آدرسی نداریم ' },
  { icon: 'phone', title: 'تماس تلفنی', text: '۰9372396496', href: 'tel:+989121234567' },
  { icon: 'mail', title: 'ایمیل', text: 'car@alipaz.com', href: 'mailto:magedshirinipazy@gmail.com' },
  { icon: 'clock', title: 'ساعات پاسخگویی', text: 'همه‌روزه ۹ صبح تا ۹ شب' },
]

const links = [
  { label: 'خونه', to: '/' },
  { label: 'ارتباط با ما' },
]
</script>

<template>
  <LayoutsHeader fixed="true"/>

  <u-container class="py-2">

    <!-- بردکرامب -->
    <UBreadcrumb :links="links" dir="rtl" :ui="{ active: 'text-mainColor font-semibold', base: 'font-light text-gray-400' }"/>

    <!-- هیرو -->
    <div class="grid lg:grid-cols-2 gap-8 items-center mb-16">
      <div>
        <h1 class="text-3xl lg:text-4xl font-extrabold text-secColor leading-snug mb-4">
          ارتباط با ما، <span class="text-mainColor">همیشه در دسترسیم</span>
        </h1>
        <p class="text-gray-500 leading-8">
          چه سوالی درباره خرید یا فروش خودرو دارید، چه پیشنهاد یا انتقادی - فرم رو پر کنید
          تا کارشناسان ما در اسرع وقت باهاتون تماس بگیرن یا پاسخ رو براتون ایمیل کنن.
        </p>
      </div>
      <div class="relative bg-secColor rounded-3xl overflow-hidden">
        <svg viewBox="0 0 320 320" class="w-full">
          <defs>
            <radialGradient id="ctGlow" cx="50%" cy="42%" r="60%">
              <stop offset="0%" stop-color="#e10f1f" stop-opacity="0.30"/>
              <stop offset="100%" stop-color="#e10f1f" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <circle cx="160" cy="150" r="140" fill="url(#ctGlow)"/>
          <path d="M-10 260 C 70 220, 130 300, 210 250 S 330 200, 340 230" stroke="#ffffff" stroke-opacity="0.16" stroke-width="26" fill="none" stroke-linecap="round"/>
          <path d="M-10 260 C 70 220, 130 300, 210 250 S 330 200, 340 230" stroke="#ffffff" stroke-opacity="0.5" stroke-width="2.5" fill="none" stroke-dasharray="10 10" stroke-linecap="round"/>

          <!-- بادکنک گفتگو -->
          <g transform="translate(160,120)">
            <rect x="-70" y="-45" width="140" height="90" rx="20" fill="#ffffff"/>
            <path d="M-20 45 L-32 68 L4 45Z" fill="#ffffff"/>
            <line x1="-45" y1="-18" x2="45" y2="-18" stroke="#1B2430" stroke-width="4" stroke-linecap="round"/>
            <line x1="-45" y1="0" x2="20" y2="0" stroke="#1B2430" stroke-width="4" stroke-linecap="round"/>
            <line x1="-45" y1="18" x2="35" y2="18" stroke="#1B2430" stroke-width="4" stroke-linecap="round" opacity="0.5"/>
          </g>

          <!-- گوشی تلفن -->
          <g transform="translate(245,205) rotate(15)">
            <circle cx="0" cy="0" r="30" fill="#e10f1f"/>
            <path d="M-9 -11c1-1.2 2.6-1.2 3.4 0l2 3.6c.7 1.2 0 2.6-1 3.4l-1.6 1.2c1.6 3 4 5.4 7 7l1.2-1.6c.8-1 2.2-1.7 3.4-1l3.6 2c1.2.8 1.2 2.4 0 3.4-3.5 3-8.4 3.2-13 .4-4-2.4-7-6-8.6-10.4-1.4-3.8-1-7 1.6-8.6Z" fill="#ffffff"/>
          </g>

          <circle cx="52" cy="70" r="4" fill="#e10f1f"/>
          <circle cx="40" cy="240" r="3" fill="#ffffff" opacity="0.7"/>
          <circle cx="280" cy="90" r="4" fill="#e10f1f" opacity="0.6"/>
        </svg>
      </div>
    </div>

    <!-- کارت‌های اطلاعات تماس -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
      <div v-for="card in infoCards" :key="card.title"
           class="bg-gray-50 rounded-2xl p-5 text-center hover:shadow-md transition">
        <div class="w-12 h-12 rounded-2xl bg-mainColor/10 flex items-center justify-center mx-auto mb-3">
          <CarIcon :name="card.icon" class="w-6 h-6 text-mainColor"/>
        </div>
        <p class="font-bold text-secColor text-sm mb-1">{{ card.title }}</p>
        <a v-if="card.href" :href="card.href" class="text-xs text-gray-500" dir="ltr">{{ card.text }}</a>
        <p v-else class="text-xs text-gray-500 leading-6">{{ card.text }}</p>
      </div>
    </div>

    <!-- فرم تماس -->
    <div class="grid lg:grid-cols-5 gap-8 mb-10">
      <div class="lg:col-span-2 flex flex-col justify-center">
        <span class="inline-flex w-fit items-center gap-2 bg-mainColor/10 text-mainColor px-4 py-1.5 rounded-full text-sm font-bold mb-4">
          <CarIcon name="message" class="w-4 h-4"/>
          در ارتباط باشید
        </span>
        <h2 class="text-2xl md:text-3xl font-extrabold text-secColor mb-3">سوالی دارید؟ خوشحال می‌شیم کمک کنیم</h2>
        <p class="text-gray-500 leading-8">
          فرم روبه‌رو رو پر کنید، کارشناسان ما پیام شما رو بررسی و در سریع‌ترین زمان ممکن پاسخ می‌دن.
        </p>
      </div>

      <div class="lg:col-span-3">
        <div class="bg-gray-50 rounded-3xl p-6 md:p-8">

          <template v-if="!submitted">
            <form @submit.prevent="submit" class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-bold text-secColor mb-1.5">نام و نام خانوادگی</label>
                <input v-model="form.name" type="text" :disabled="loading" placeholder="مثلاً علی رضایی"
                       class="w-full rounded-xl border-2 px-4 py-2.5 outline-none transition bg-white disabled:opacity-60"
                       :class="errors.name ? 'border-red-400' : 'border-gray-200 focus:border-mainColor'">
                <p v-if="errors.name" class="text-xs text-red-500 mt-1">{{ errors.name }}</p>
              </div>

              <div>
                <label class="block text-sm font-bold text-secColor mb-1.5">ایمیل</label>
                <input v-model="form.email" type="email" :disabled="loading" placeholder="example@mail.com" dir="ltr"
                       class="w-full rounded-xl border-2 px-4 py-2.5 outline-none transition text-left bg-white disabled:opacity-60"
                       :class="errors.email ? 'border-red-400' : 'border-gray-200 focus:border-mainColor'">
                <p v-if="errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</p>
              </div>

              <div class="sm:col-span-2">
                <label class="block text-sm font-bold text-secColor mb-1.5">موضوع</label>
                <input v-model="form.subject" type="text" :disabled="loading" placeholder="موضوع پیام شما"
                       class="w-full rounded-xl border-2 px-4 py-2.5 outline-none transition bg-white disabled:opacity-60"
                       :class="errors.subject ? 'border-red-400' : 'border-gray-200 focus:border-mainColor'">
                <p v-if="errors.subject" class="text-xs text-red-500 mt-1">{{ errors.subject }}</p>
              </div>

              <div class="sm:col-span-2">
                <label class="block text-sm font-bold text-secColor mb-1.5">متن پیام</label>
                <textarea v-model="form.text" rows="5" :disabled="loading" placeholder="پیام خود را بنویسید..."
                          class="w-full rounded-xl border-2 px-4 py-2.5 outline-none transition bg-white disabled:opacity-60 resize-none"
                          :class="errors.text ? 'border-red-400' : 'border-gray-200 focus:border-mainColor'"></textarea>
                <p v-if="errors.text" class="text-xs text-red-500 mt-1">{{ errors.text }}</p>
              </div>

              <div class="sm:col-span-2 mt-2">
                <button type="submit" :disabled="loading"
                        class="w-full bg-mainColor hover:bg-mainColor/90 text-white font-bold rounded-xl py-3 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  <span v-if="loading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                  <CarIcon v-else name="send" class="w-4 h-4"/>
                  {{ loading ? 'در حال ارسال...' : 'ارسال پیام' }}
                </button>
              </div>
            </form>
          </template>

          <template v-else>
            <div class="flex flex-col items-center text-center py-8">
              <div class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CarIcon name="check" class="w-8 h-8 text-green-600"/>
              </div>
              <h2 class="text-xl font-extrabold text-secColor mb-2">پیام شما ارسال شد</h2>
              <p class="text-gray-500 max-w-md leading-7 mb-6">
                ممنون که با ما در ارتباط هستید. کارشناسان ما به‌زودی پیام شما رو بررسی و پاسخ می‌دن.
              </p>
              <button @click="resetForm"
                      class="text-mainColor font-bold border-2 border-mainColor rounded-xl px-6 py-2 hover:bg-mainColor hover:text-white transition">
                ارسال پیام جدید
              </button>
            </div>
          </template>

        </div>
      </div>
    </div>

  </u-container>

  <LayoutsFooter/>
</template>
