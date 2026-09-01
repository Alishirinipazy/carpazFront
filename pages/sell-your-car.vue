<script setup>
useHead({ title: 'فروش ماشین شما' })

const toast = useToast()
const phonePattern = /^(\+98|0)?9\d{9}$/

const form = ref({
  full_name: '',
  car_type: '',
  car_model: '',
  phone: '',
})

const loading = ref(false)
const submitted = ref(false)
const errors = ref({})

function validate() {
  const e = {}
  if (!form.value.full_name.trim()) e.full_name = 'نام و نام خانوادگی را وارد کنید'
  if (!form.value.car_type.trim()) e.car_type = 'نوع ماشین را وارد کنید'
  if (!form.value.car_model.trim()) e.car_model = 'مدل ماشین را وارد کنید'
  if (!phonePattern.test(form.value.phone)) e.phone = 'شماره موبایل معتبر نیست'
  errors.value = e
  return Object.keys(e).length === 0
}

async function submit() {
  if (!validate()) return

  loading.value = true
  try {
    await $fetch('/api/sell-requests/create', {
      method: 'POST',
      body: form.value,
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
  form.value = { full_name: '', car_type: '', car_model: '', phone: '' }
  errors.value = {}
  submitted.value = false
}

const steps = [
  { icon: 'mdi:form-select', title: 'فرم رو پر کن', text: 'مشخصات خودروت رو در چند ثانیه برای ما ارسال کن' },
  { icon: 'mdi:phone-check-outline', title: 'تماس کارشناس', text: 'کارشناس ما باهات تماس می‌گیره و قیمت پیشنهادی رو اعلام می‌کنه' },
  { icon: 'mdi:cash-fast', title: 'فروش نقدی', text: 'در صورت توافق، معامله همون روز و به‌صورت نقدی انجام میشه' },
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
      <div class="flex flex-col items-center text-center py-16 md:py-24">
        <span class="inline-flex items-center gap-2 bg-mainColor/15 text-mainColor px-4 py-1.5 rounded-full text-sm font-bold mb-4">
          <UIcon name="mdi:clock-fast" class="w-4 h-4" />
          فروش ماشین شما در کمتر از یک روز
        </span>
        <h1 class="text-white text-3xl md:text-5xl font-extrabold mb-4">فروش ماشین شما</h1>
        <p class="text-white/70 max-w-xl leading-8">
          خودروی خودتون رو به‌صورت مستقیم و بدون واسطه به ما بفروشید؛ کافیه مشخصات خودرو و
          شماره تماستون رو ثبت کنید تا کارشناسان ما در کمتر از یک روز باهاتون تماس بگیرن
          و بهترین قیمت رو پیشنهاد بدن.
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

      <!-- form -->
      <div class="lg:col-span-3">
        <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8">

          <template v-if="!submitted">
            <h2 class="text-xl font-extrabold text-secColor mb-1">مشخصات خودرو و تماس</h2>
            <p class="text-sm text-gray-500 mb-6">اطلاعات زیر رو دقیق پر کنید تا کارشناسان ما سریع‌تر باهاتون تماس بگیرن</p>

            <form @submit.prevent="submit" class="grid sm:grid-cols-2 gap-4">
              <div class="sm:col-span-1">
                <label class="block text-sm font-bold text-secColor mb-1.5">نام و نام خانوادگی</label>
                <input
                    v-model="form.full_name"
                    type="text"
                    :disabled="loading"
                    placeholder="مثلاً علی رضایی"
                    class="w-full rounded-xl border-2 px-4 py-2.5 outline-none transition disabled:opacity-60"
                    :class="errors.full_name ? 'border-red-400' : 'border-gray-200 focus:border-mainColor'"
                >
                <p v-if="errors.full_name" class="text-xs text-red-500 mt-1">{{ errors.full_name }}</p>
              </div>

              <div class="sm:col-span-1">
                <label class="block text-sm font-bold text-secColor mb-1.5">شماره تماس</label>
                <input
                    v-model="form.phone"
                    type="tel"
                    inputmode="numeric"
                    :disabled="loading"
                    placeholder="09100000000"
                    dir="ltr"
                    class="w-full rounded-xl border-2 px-4 py-2.5 outline-none transition text-left disabled:opacity-60"
                    :class="errors.phone ? 'border-red-400' : 'border-gray-200 focus:border-mainColor'"
                >
                <p v-if="errors.phone" class="text-xs text-red-500 mt-1">{{ errors.phone }}</p>
              </div>

              <div class="sm:col-span-1">
                <label class="block text-sm font-bold text-secColor mb-1.5">نوع ماشین</label>
                <input
                    v-model="form.car_type"
                    type="text"
                    :disabled="loading"
                    placeholder="مثلاً سواری، شاسی‌بلند، وانت"
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
                    placeholder="مثلاً پژو ۲۰۶ مدل ۱۴۰۰"
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
                کارشناسان ما در کمتر از یک روز کاری با شماره‌ای که ثبت کردید تماس می‌گیرن
                و قیمت پیشنهادی برای خودروتون رو اعلام می‌کنن.
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
