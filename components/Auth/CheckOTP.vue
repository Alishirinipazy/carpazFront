<script setup>
const props = defineProps({
  embedded: { type: Boolean, default: false },
  // وقتی embedded هست، شماره از پراپ میاد؛ وگرنه از query string صفحه‌ی ورود خونده میشه
  cellphone: { type: String, default: '' }
})

const emit = defineEmits(['verified'])

const toast = useToast();
const { authUser } = useAuth();
const favorites = useFavoritesStore();
const route = useRoute()
const backState = ref("")
const errorMSG = ref({})
const loading = ref(false)
const pattern = /^[0-9]{6}$/;
const otp = ref(null)

const displayCellphone = computed(() => props.embedded ? props.cellphone : route?.query?.cellphone)

async function chechOTP() {
  if (otp?.value === null) {
    toast.add({title:"کد تایید رو وارد نکردییی😒"});
    return
  } else if (!pattern.test(otp.value)) {
    toast.add({title:"ساختار کد ناخواناست 🤔"});
    return;
  }
  loading.value = true
  try {
    const data = await $fetch('/api/auth/checkOtp', {
      method: 'POST',
      body: { otp: otp.value }
    })
    toast.add({title:"شما با موفقیت وارد حساب شده اید"})
    authUser.value = data
    backState.value = "bg-green-800 text-white"
    await favorites.fetchAll()

    if (props.embedded) {
      emit('verified')
    } else {
      setTimeout(function () {
        return navigateTo('/profile/')
      }, 2000);
    }

  } catch (error) {
    errorMSG.value = Object.values(error.data.data.message).flat()
    toast.add({title: `${errorMSG.value}`})
    backState.value = "bg-red-800 text-white"
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div class="p-10 border border-mainColor bg-secColor text-white rounded-2xl flex flex-col items-center  border-2 ">
    <img v-if="!embedded" src="/images/logo.webp" alt="نمایشگاه خودرو" class="w-[280px]">
    <br v-if="!embedded">
    <p>بچه ها به شماره <span class="text-mainColor "> {{ displayCellphone }} </span> کد 6 رقمی ارسال کردند</p>
    <p class="text-right mt-5 w-full">کد تایید به حساب کاربری</p>
    <div class="mt-1 ">
      <input type="tel" maxlength="6" required :disabled="loading"
             class="  h-10 border-mainColor border-2 rounded-2xl text-center m-2 text-secColor space-x-28 transition disabled:opacity-60"
             :class="backState" v-model="otp" style="letter-spacing: 1vh">
    </div>
    <u-button color="red" @click="chechOTP" :loading="loading">تایید</u-button>
  </div>
</template>
