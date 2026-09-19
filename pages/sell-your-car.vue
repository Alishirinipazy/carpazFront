<script setup>
const { public: { siteUrl } } = useRuntimeConfig()
useSeoMeta({
  title: 'فروش ماشین شما',
  description: 'خودروی خودتون رو مستقیم و بدون واسطه در کارپاز به فروش برسانید - کارشناسی و اعلام قیمت در کمتر از یک روز.',
  ogTitle: 'فروش ماشین شما به کارپاز',
  ogType: 'website',
})
useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/sell-your-car` }] })

const toast = useToast()
const { authUser } = useAuth()

const form = ref({
  car_type: '',
  car_model: '',
})

const nameInput = ref('')
const loading = ref(false)
const submitted = ref(false)
const errors = ref({})

function validate() {
  const e = {}
  if (!authUser.value?.name && !nameInput.value.trim()) e.name = 'نام و نام خانوادگی را وارد کنید'
  if (!form.value.car_type.trim()) e.car_type = 'نام خودرو را وارد کنید'
  if (!form.value.car_model.trim()) e.car_model = 'سا ساخت خودرو را وارد کنید'
  errors.value = e
  return Object.keys(e).length === 0
}

async function submit() {
  if (!validate()) return

  loading.value = true
  try {
    // کاربر تازه‌وارد هنوز توی حسابش اسم نداره - همین‌جا ثبتش می‌کنیم تا
    // دیگه لازم نباشه هرجا دوباره بپرسیم (مثل پروفایل، برای همیشه می‌مونه)
    if (!authUser.value?.name) {
      const updated = await $fetch('/api/profile/info/edit', {
        method: 'POST',
        body: { name: nameInput.value.trim() },
      })
      authUser.value = { ...authUser.value, ...updated }
    }

    await $fetch('/api/sell-requests/create', {
      method: 'POST',
      body: {
        ...form.value,
        full_name: authUser.value?.name,
        phone: authUser.value?.cellphone,
      },
    })
    submitted.value = true
    toast.add({ title: 'درخواست شما با موفقیت ثبت شد', color: 'green' })
  } catch (error) {
    toast.add({
      title: error?.data?.data?.message || 'مشکلی پیش اومد، دوباره امتحان کن',
      color: 'red',
    })
  } finally {
    loading.value = false
  }
}

function resetForm() {
  form.value = { car_type: '', car_model: '' }
  errors.value = {}
  submitted.value = false
}

const steps = [
  { icon: 'mdi:form-select', title: 'فرم رو پر کن', text: 'مشخصات خودروت رو در چند ثانیه برای ما ارسال کن' },
  { icon: 'mdi:phone-check-outline', title: 'تماس کارشناس', text: 'کارشناس ما باهات تماس می‌گیره و تایم هماهنگی رو اعلام می‌کنه' },
  { icon: 'mdi:instagram', title: 'تولید محتوا از خودرو', text: 'عکاسی و فیلم برداری و افزودن به آگهی ها کارپــاز' },
]
</script>

<template>
  <LayoutsHeader />

  <!-- Hero -->
  <section class="hero-sell relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-secColor via-secColor/95 to-secColor"></div>
    <div class="absolute -left-10 -bottom-10 opacity-10 text-white hidden md:block">
      <UIcon name="mdi:car-side" class="w-[380px] h-[380px]" />
    </div>

    <u-container class="relative z-10">
      <div class="flex flex-col items-center text-center py-16 md:py-10">
        <span class="inline-flex items-center gap-2 bg-mainColor/15 text-mainColor px-4 py-1.5 rounded-full text-sm font-bold mb-4">
          <UIcon name="mdi:clock-fast" class="w-4 h-4" />
          فروش ماشین شما در کمتر از یک روز
        </span>
        <h1 class="text-white text-3xl md:text-5xl font-extrabold mb-4">فروش ماشین شما</h1>
        <p class="text-white/70 max-w-xl leading-8">
          خودروی خودتون رو به‌صورت مستقیم و بدون واسطه در کارپــاز آگهی کنید؛ کافیه مشخصات خودرو رو
          ثبت کنید تا کارشناسان ما در کمتر از یک روز باهاتون تماس بگیرن و بهترین قیمت رو پیشنهاد بدن.
        </p>
      </div>
    </u-container>
  </section>

  <u-container>
    <div class="grid lg:grid-cols-5 gap-8 -mt-10 md:-mt-16 relative z-20 pb-16">

      <!-- steps -->
      <div class="lg:col-span-2 grid sm:grid-cols-3 lg:grid-cols-1 gap-4">
        <div v-for="(step, i) in steps" :key="i"
             class="bg-white rounded-2xl shadow-lg p-5 flex lg:flex-row flex-col items-center lg:items-start gap-4 text-center lg:text-right">
          <div class="w-12 h-12 shrink-0 rounded-full bg-mainColor/10 flex items-center justify-center">
            <UIcon :name="step.icon" class="w-6 h-6 text-mainColor" />
          </div>
          <div>
            <h3 class="font-bold text-secColor mb-1">{{ step.title }}</h3>
            <p class="text-sm text-gray-500 leading-6">{{ step.text }}</p>
          </div>
        </div>
      </div>

      <!-- form / login gate -->
      <div class="lg:col-span-3">

        <!-- کاربر لاگین نیست: به‌جای فرم، ورود همین‌جا -->
        <template v-if="!authUser">
          <AuthGate />
        </template>

        <div v-else class="bg-white rounded-2xl shadow-lg p-6 md:p-8">

          <template v-if="!submitted">
            <div class="flex items-center justify-between mb-1">
              <h2 class="text-xl font-extrabold text-secColor">مشخصات خودرو</h2>
              <span v-if="authUser?.name" class="text-xs bg-gray-100 text-gray-500 rounded-full px-3 py-1">
                به نام {{ authUser.name }} - {{ authUser?.cellphone }}
              </span>
            </div>
            <p class="text-sm text-gray-500 mb-6">
              {{ authUser?.name ? 'اطلاعات تماست از حسابت گرفته میشه، فقط مشخصات خودرو رو وارد کن' : 'برای ثبت درخواست، اول اسمت رو وارد کن' }}
            </p>

            <form @submit.prevent="submit" class="grid sm:grid-cols-2 gap-4">
              <div v-if="!authUser?.name" class="sm:col-span-2">
                <label class="block text-sm font-bold text-secColor mb-1.5">نام و نام خانوادگی</label>
                <input
                    v-model="nameInput"
                    type="text"
                    :disabled="loading"
                    placeholder="مثلاً علی رضایی"
                    class="w-full rounded-xl border-2 px-4 py-2.5 outline-none transition disabled:opacity-60"
                    :class="errors.name ? 'border-red-400' : 'border-gray-200 focus:border-mainColor'"
                >
                <p v-if="errors.name" class="text-xs text-red-500 mt-1">{{ errors.name }}</p>
              </div>

              <div class="sm:col-span-1">
                <label class="block text-sm font-bold text-secColor mb-1.5">نوع ماشین</label>
                <input
                    v-model="form.car_type"
                    type="text"
                    :disabled="loading"
                    placeholder="آریزو 6 جی تی"
                    class="w-full rounded-xl border-2 px-4 py-2.5 outline-none transition disabled:opacity-60"
                    :class="errors.car_type ? 'border-red-400' : 'border-gray-200 focus:border-mainColor'"
                >
                <p v-if="errors.car_type" class="text-xs text-red-500 mt-1">{{ errors.car_type }}</p>
              </div>

              <div class="sm:col-span-1">
                <label class="block text-sm font-bold text-secColor mb-1.5">مدل ماشین</label>
                <input
                    v-model="form.car_model"
                    type="text"
                    :disabled="loading"
                    placeholder="2026"
                    class="w-full rounded-xl border-2 px-4 py-2.5 outline-none transition disabled:opacity-60"
                    :class="errors.car_model ? 'border-red-400' : 'border-gray-200 focus:border-mainColor'"
                >
                <p v-if="errors.car_model" class="text-xs text-red-500 mt-1">{{ errors.car_model }}</p>
              </div>

              <div class="sm:col-span-2 mt-2">
                <button
                    type="submit"
                    :disabled="loading"
                    class="w-full bg-mainColor hover:bg-mainColor/90 text-white font-bold rounded-xl py-3 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span v-if="loading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {{ loading ? 'در حال ارسال...' : 'ثبت درخواست فروش' }}
                </button>
              </div>
            </form>
          </template>

          <!-- success state -->
          <template v-else>
            <div class="flex flex-col items-center text-center py-8">
              <div class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <UIcon name="mdi:check-bold" class="w-8 h-8 text-green-600" />
              </div>
              <h2 class="text-xl font-extrabold text-secColor mb-2">درخواست شما ثبت شد</h2>
              <p class="text-gray-500 max-w-md leading-7 mb-6">
                کارشناسان ما در کمتر از یک روز کاری باهاتون تماس می‌گیرن و هماهنگی های لازم رو انجام میدن.
              </p>
              <button @click="resetForm" class="text-mainColor font-bold border-2 border-mainColor rounded-xl px-6 py-2 hover:bg-mainColor hover:text-white transition">
                ثبت درخواست جدید
              </button>
            </div>
          </template>

        </div>
      </div>
    </div>
  </u-container>

  <LayoutsFooter />
</template>

<style>
.hero-sell { @apply bg-secColor pt-16 lg:pt-24 }
</style>
