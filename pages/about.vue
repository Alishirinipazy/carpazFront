<script setup>
const {public: {siteUrl}} = useRuntimeConfig()
useSeoMeta({
  title: 'درباره ما',
  description: 'داستان شکل‌گیری کارپاز، ماموریت، چشم‌انداز و تیمی که با عشق این پلتفرم رو می‌سازن.',
  ogTitle: 'درباره کارپاز',
  ogDescription: 'داستان شکل‌گیری کارپاز، ماموریت و چشم‌انداز ما.',
  ogType: 'website',
})
useHead({link: [{rel: 'canonical', href: `${siteUrl}/about`}]})

const stats = [
  {value: '+۵۰۰', label: 'خودروی فروخته‌شده'},
  {value: '+۱۲۰۰', label: 'مشتری راضی'},
  {value: '۲', label: 'اعضای تیم'},
  {value: '۱۴۰۵', label: 'سال تاسیس'},
]

const missionPoints = [
  'بازرسی فنی کامل هر خودرو، پیش از قرار گرفتن روی سایت',
  'قیمت‌گذاری منصفانه و شفاف، بر اساس قیمت واقعی بازار',
  'همراهی یک کارشناس واقعی، از انتخاب تا تحویل خودرو',
]

const visionPoints = [
  'تبدیل شدن به مرجع اول خرید و فروش خودرو در ایران',
  'گسترش شبکه کارشناسان فنی در سراسر کشور',
  'ساختن رابطه‌ای بلندمدت و مبتنی بر اعتماد با هر مشتری',
]

const historyHighlights = [
  'شروع ساده از یک ذهن و اراده به نام علیپاز',
  'راه‌اندازی پلتفرم آنلاین در سال ۱۴۰۵',
  'در حال جذب و توسعه',
  'رشد مستمر، قدم به قدم و با اعتماد مشتریان',
]

const workSteps = [
  {icon: 'search-car', title: 'انتخاب خودرو', desc: 'از بین صدها آگهی نو و کارکرده، خودروی مناسب خودتون رو پیدا کنید.'},
  {
    icon: 'clipboard-check',
    title: 'کارشناسی فنی',
    desc: 'هر خودرو پیش از عرضه، توسط کارشناسان ما به‌طور کامل بازرسی می‌شه.'
  },
  {icon: 'price-tag', title: 'توافق قیمت', desc: 'با مشاوره کارشناس فروش، به قیمتی منصفانه و شفاف می‌رسید.'},
  {icon: 'car-key', title: 'تحویل خودرو', desc: 'تحویل امن خودرو همراه با مدارک کامل و پشتیبانی پس از فروش.'},
]

const teams = [
  {icon: 'headset', title: 'مشاوران فروش', desc: 'راهنمایی برای انتخاب بهترین خودرو متناسب با نیاز شما'},
  {icon: 'wrench', title: 'کارشناسان فنی', desc: 'بازرسی و تست فنی کامل پیش از هر معامله'},
  {icon: 'chat', title: 'پشتیبانی مشتری', desc: 'پاسخگویی به سوالات و پیگیری سفارش‌ها'},
  {icon: 'car-side', title: 'تحویل و لجستیک', desc: 'هماهنگی و تحویل امن خودرو در سریع‌ترین زمان'},
]

const whyUs = [
  {icon: 'shield-check', title: 'بازرسی فنی کامل', desc: 'هر خودرو قبل از ارسال بررسی فنی می‌شه.'},
  {icon: 'speed', title: 'تحویل سریع', desc: 'از انتخاب تا تحویل، در کوتاه‌ترین زمان ممکن.'},
  {icon: 'price-tag', title: 'قیمت منصفانه', desc: 'بدون واسطه‌ی اضافه، مستقیم و شفاف.'},
  {icon: 'heart', title: 'با عشق در کنار شما', desc: 'از انتخاب خودرو تا تحویل، با دقت و صداقت.'},
]

const links = [
  {label: 'خونه', to: '/'},
  {label: 'دربارمون'},
]
</script>

<template>
  <LayoutsHeader fixed="true"/>

  <u-container class="py-2">

    <!-- بردکرامب -->
    <UBreadcrumb :links="links" dir="rtl"
                 :ui="{ active: 'text-mainColor font-semibold', base: 'font-light text-gray-400' }"/>

    <!-- هیرو -->
    <div class="grid lg:grid-cols-2 gap-8 items-center mb-16">
      <div>
        <h1 class="text-3xl lg:text-4xl font-extrabold text-secColor leading-snug mb-4">
          با عشق در کنار شما، <span class="text-mainColor">تا لحظه‌ی تحویل خودرو</span>
        </h1>
        <p class="text-gray-500 leading-8">
          ماجرای کارپاز از علاقه به دنیای خودرو شروع شد؛ از دیدن اینکه پیدا کردن یه خودروی مناسب، نو یا
          کارکرده، چقدر می‌تونه سخت و پر از عدم‌اطمینان باشه. برای همین با عشق تیمی رو جمع کردیم تا یه
          پلتفرم شفاف و قابل‌اعتماد برای خرید و فروش خودرو بسازیم.
        </p>
      </div>
      <div class="relative bg-secColor rounded-3xl overflow-hidden">
        <svg viewBox="0 0 320 320" class="w-full">
          <defs>
            <radialGradient id="abGlow" cx="50%" cy="42%" r="60%">
              <stop offset="0%" stop-color="#e10f1f" stop-opacity="0.30"/>
              <stop offset="100%" stop-color="#e10f1f" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <circle cx="160" cy="150" r="140" fill="url(#abGlow)"/>
          <path d="M-10 260 C 70 220, 130 300, 210 250 S 330 200, 340 230" stroke="#ffffff" stroke-opacity="0.16"
                stroke-width="26" fill="none" stroke-linecap="round"/>
          <path d="M-10 260 C 70 220, 130 300, 210 250 S 330 200, 340 230" stroke="#ffffff" stroke-opacity="0.5"
                stroke-width="2.5" fill="none" stroke-dasharray="10 10" stroke-linecap="round"/>
          <g transform="translate(215,60)">
            <circle cx="0" cy="0" r="34" fill="#1B2430"/>
            <circle cx="0" cy="0" r="24" fill="none" stroke="#ffffff" stroke-width="3"/>
            <circle cx="0" cy="0" r="7" fill="none" stroke="#ffffff" stroke-width="3"/>
            <path d="M0 -17v10" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
            <path d="M-15 10l10-4.5" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
            <path d="M15 10l-10-4.5" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
          </g>
          <g transform="translate(55,130)">
            <path d="M4 66v-16l14-30a16 16 0 0 1 14-9h71a16 16 0 0 1 14 9l14 30h12a4 4 0 0 1 4 4v12a8 8 0 0 1-8 8h-12"
                  fill="#e10f1f" stroke="#1B2430" stroke-width="3" stroke-linejoin="round"/>
            <path d="M4 66h12M133 66h-9" stroke="#1B2430" stroke-width="3" stroke-linecap="round"/>
            <path d="M30 20h60" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.85"/>
            <circle cx="34" cy="68" r="14" fill="#1B2430"/>
            <circle cx="34" cy="68" r="5" fill="#ffffff"/>
            <circle cx="104" cy="68" r="14" fill="#1B2430"/>
            <circle cx="104" cy="68" r="5" fill="#ffffff"/>
          </g>
          <g transform="translate(258,175)">
            <line x1="0" y1="0" x2="0" y2="46" stroke="#1B2430" stroke-width="3.5" stroke-linecap="round"/>
            <path d="M0 2h26l-7 8 7 8H0Z" fill="#ffffff" stroke="#1B2430" stroke-width="2" stroke-linejoin="round"/>
          </g>
          <circle cx="52" cy="70" r="4" fill="#e10f1f"/>
          <circle cx="40" cy="215" r="3" fill="#ffffff" opacity="0.7"/>
          <circle cx="280" cy="120" r="4" fill="#e10f1f" opacity="0.6"/>
        </svg>
      </div>
    </div>

    <!-- آمار -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20 bg-secColor rounded-3xl p-8">
      <div v-for="s in stats" :key="s.label" class="text-center">
        <p class="text-2xl lg:text-3xl font-extrabold text-mainColor">{{ s.value }}</p>
        <p class="text-xs text-gray-300 mt-1">{{ s.label }}</p>
      </div>
    </div>

    <!-- ماموریت -->
    <div class="grid lg:grid-cols-2 gap-10 items-center mb-20">
      <div class="bg-gray-50 rounded-3xl order-2 lg:order-1 flex items-center justify-center py-16">
        <div class="w-24 h-24 rounded-3xl bg-mainColor/10 flex items-center justify-center">
          <CarIcon name="wheel" class="w-12 h-12 text-mainColor"/>
        </div>
      </div>
      <div class="order-1 lg:order-2">
        <h2 class="text-2xl font-extrabold text-secColor mb-4">ماموریت ما</h2>
        <p class="text-gray-500 leading-8 mb-4">
          ماموریت ما ساده‌ست: خرید و فروش خودرو رو برای شما آسون، مطمئن و بدون دغدغه کنیم.
        </p>
        <ul class="space-y-2">
          <li v-for="p in missionPoints" :key="p" class="flex items-start gap-2 text-sm text-gray-600">
            <CarIcon name="check" class="text-mainColor w-5 h-5 flex-shrink-0 mt-0.5"/>
            {{ p }}
          </li>
        </ul>
      </div>
    </div>

    <!-- چشم‌انداز -->
    <div class="grid lg:grid-cols-2 gap-10 items-center mb-20">
      <div>
        <h2 class="text-2xl font-extrabold text-secColor mb-4">چشم‌انداز ما</h2>
        <p class="text-gray-500 leading-8 mb-4">
          چشم‌اندازمون اینه که کارپاز رو به انتخاب اول هر کسی تبدیل کنیم که دنبال یه معامله‌ی شفاف و مطمئنه.
        </p>
        <ul class="space-y-2">
          <li v-for="p in visionPoints" :key="p" class="flex items-start gap-2 text-sm text-gray-600">
            <CarIcon name="check" class="text-mainColor w-5 h-5 flex-shrink-0 mt-0.5"/>
            {{ p }}
          </li>
        </ul>
      </div>
      <div class="bg-gray-50 rounded-3xl flex items-center justify-center py-16">
        <div class="w-24 h-24 rounded-3xl bg-mainColor/10 flex items-center justify-center">
          <CarIcon name="eye" class="w-12 h-12 text-mainColor"/>
        </div>
      </div>
    </div>

    <!-- داستان ما -->
    <div class="grid lg:grid-cols-2 gap-10 items-center mb-20">
      <div class="bg-gray-50 rounded-3xl order-2 lg:order-1 flex items-center justify-center py-16">
        <div class="w-24 h-24 rounded-3xl bg-mainColor/10 flex items-center justify-center">
          <CarIcon name="flag" class="w-12 h-12 text-mainColor"/>
        </div>
      </div>
      <div class="order-1 lg:order-2">
        <h2 class="text-2xl font-extrabold text-secColor mb-4">داستان ما</h2>
        <p class="text-gray-500 leading-8 mb-4 text-sm">
          کارپاز از دل یک نمایشگاه کوچک خودرو شروع شد؛ جایی که هر روز با مشتری‌هایی روبه‌رو می‌شدیم که
          دنبال یه خودروی مطمئن بودن ولی از شفافیت قیمت و کیفیت مطمئن نبودن. همین دغدغه باعث شد تصمیم بگیریم
          یه پلتفرم آنلاین بسازیم که هر خودرو پیش از عرضه، کارشناسی فنی بشه و قیمت‌ها کاملاً شفاف باشه.
          امروز با تیمی از کارشناسان فروش و فنی، تلاش می‌کنیم
          <span class="text-mainColor font-bold"> همراه مطمئن شما در مسیر خرید و فروش خودرو</span> باشیم.
        </p>
        <ul class="space-y-2">
          <li v-for="h in historyHighlights" :key="h" class="flex items-start gap-2 text-sm text-gray-600">
            <CarIcon name="check" class="text-mainColor w-5 h-5 flex-shrink-0 mt-0.5"/>
            {{ h }}
          </li>
        </ul>
      </div>
    </div>

    <!-- چطور کار می‌کنیم -->
    <div class="text-center mb-10">
      <h2 class="text-2xl font-extrabold text-secColor mb-2">چطور کار می‌کنیم</h2>
      <p class="text-gray-500 text-sm max-w-xl mx-auto">
        از انتخاب خودرو تا رسیدن به دست شما، هر مرحله رو با دقت و شفافیت طی می‌کنیم.
      </p>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
      <div v-for="w in workSteps" :key="w.title" class="text-center p-4">
        <div class="w-12 h-12 rounded-2xl bg-mainColor/10 flex items-center justify-center mx-auto mb-3">
          <CarIcon :name="w.icon" class="w-6 h-6 text-mainColor"/>
        </div>
        <p class="font-bold text-secColor text-sm mb-1">{{ w.title }}</p>
        <p class="text-xs text-gray-500 leading-6">{{ w.desc }}</p>
      </div>
    </div>

    <!-- تیم -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-extrabold text-secColor mb-2">ساختن با عشق، به‌عنوان یک تیم</h2>
        <p class="text-gray-500 text-sm max-w-xl">
          موفقیت ما نتیجه‌ی تلاش تیمیه که با هم، با عشق، این پلتفرم رو می‌سازن.
        </p>
      </div>
      <nuxt-link to="/cars"
                 class="hidden lg:block bg-mainColor text-white font-bold text-sm px-6 py-2.5 rounded-full hover:brightness-110 transition flex-shrink-0">
        مشاهده خودروها
      </nuxt-link>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
      <div v-for="t in teams" :key="t.title" class="bg-gray-50 rounded-2xl p-5 text-center hover:shadow-md transition">
        <div class="w-14 h-14 rounded-2xl bg-secColor flex items-center justify-center mx-auto mb-3">
          <CarIcon :name="t.icon" class="w-7 h-7 text-mainColor"/>
        </div>
        <p class="font-bold text-secColor text-sm mb-1">{{ t.title }}</p>
        <p class="text-xs text-gray-500">{{ t.desc }}</p>
      </div>
    </div>

    <!-- چرا ما -->
    <div class="text-center mb-10">
      <h2 class="text-2xl font-extrabold text-secColor mb-2">چرا کارپاز؟</h2>
      <p class="text-gray-500 text-sm max-w-xl mx-auto">
        دلایلی که مشتری‌های ما هر بار برمی‌گردن.
      </p>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      <div v-for="w in whyUs" :key="w.title" class="text-center p-4 border border-gray-100 rounded-2xl">
        <div class="w-12 h-12 rounded-2xl bg-mainColor/10 flex items-center justify-center mx-auto mb-3">
          <CarIcon :name="w.icon" class="w-6 h-6 text-mainColor"/>
        </div>
        <p class="font-bold text-secColor text-sm mb-1">{{ w.title }}</p>
        <p class="text-xs text-gray-500 leading-6">{{ w.desc }}</p>
      </div>
    </div>

  </u-container>

  <LayoutsFooter/>
</template>
