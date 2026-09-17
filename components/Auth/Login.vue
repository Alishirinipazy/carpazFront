<script setup>
const props = defineProps({
  // وقتی داخل یک صفحه‌ی دیگه (مثل فروش ماشین یا فرم خرید) نشون داده میشه:
  // بدون لوگو (که شلوغ نشه) و بدون پرش به صفحه‌ی جداگانه‌ی ورود
  embedded: { type: Boolean, default: false }
})

const toast = useToast()
const emit = defineEmits(['showCheckOtpForm'])
const router = useRouter()

const cellphone = ref(null)
const loading = ref(false)
const pattern = /^(\+98|0)?9\d{9}$/

async function login() {
  if (!cellphone.value) {
    toast.add({ title: 'شماره تلفنت رو که وارد نکردی؟' })
    return
  }
  if (!pattern.test(cellphone.value)) {
    toast.add({ title: 'شماره تلفنت رو درست حسابی وارد کن...' })
    return
  }

  loading.value = true
  try {
    const data = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { cellphone: cellphone.value }
    })

    toast.add({ title: `کد تایید به شماره ${cellphone.value} ارسال شد` })
    emit('showCheckOtpForm', cellphone.value)

    if (!props.embedded) {
      router.push({
        path: '/auth/login',
        query: { cellphone: cellphone.value }
      })
    }
  } catch (error) {
    toast.add({
      title: error?.data?.message || 'مشکلی پیش اومد، دوباره امتحان کن',
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="p-8 border-2 border-mainColor bg-secColor text-white rounded-2xl flex flex-col items-center">

    <img v-if="!embedded" src="/images/logo.webp" alt="نمایشگاه خودرو" class="w-[280px]">
    <p class="text-xl mt-3 mb-4" >{{embedded ?'ثبت شماره تماس':'ورود و ثبت نام '}}</p>
    <p class="text-center">{{ !embedded ? 'برای ورود به حساب ابتدا شماره تماس را وارد کنید' : 'برای ثبت درخواست ابتدا شماره تماس وارد کنید '}}</p>

    <form @submit.prevent="login" class="mt-5 w-full text-center">
      <input
          v-model="cellphone"
          type="tel"
          inputmode="numeric"
          :disabled="loading"
          class="p-1 w-full my-3 text-secColor text-center border-mainColor rounded border-2 disabled:opacity-60"
          placeholder="09100000000"
      >

      <button
          type="submit"
          :disabled="loading"
          class="my-2 text-center bg-mainColor w-full rounded py-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <span
            v-if="loading"
            class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
        />
        {{ loading ? 'در حال ارسال...' : 'ورود' }}
      </button>
    </form>
  </div>
</template>
