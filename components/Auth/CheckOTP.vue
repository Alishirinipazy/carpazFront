<script setup>
const toast = useToast();
const {authUser} = useAuth();
const favorites = useFavoritesStore();
const route = useRoute()
const backState = ref("")
const errorMSG = ref({})
const pattern = /^[0-9]{6}$/;
const otp = ref(null)

async function chechOTP() {
  if (otp?.value === null) {
    toast.add({title:"کد تایید رو وارد نکردییی😒"});
    return
  } else if (!pattern.test(otp.value)) {
    toast.add({title:"ساختار کد ناخواناست 🤔"});
    return;
  }
  try {
    const data = await $fetch('/api/auth/checkOtp', {
      method: 'POST',
      body: { otp: otp.value }
    })
    toast.add({title:"شما با موفقیت وارد حساب شده اید"})
    authUser.value = data
    backState.value = "bg-green-800 text-white"
    await favorites.fetchAll()
    setTimeout(function () {
      return navigateTo('/profile/')
    }, 2000);


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
    <img src="/images/logo.webp" alt="نمایشگاه خودرو" class="w-[280px]">
    <br>
    <p>بچه ها به شماره <span class="text-mainColor "> {{ route?.query?.cellphone }} </span> کد 6 رقمی ارسال کردند</p>
    <p class="text-right mt-5 w-full">کد تایید به حساب کاربری</p>
    <div class="mt-1 ">
      <input type="tel" maxlength="6" required
             class="  h-10 border-mainColor border-2 rounded-2xl text-center m-2 text-secColor space-x-28 transition"
             :class="backState" v-model="otp" style="letter-spacing: 1vh">
    </div>
    <u-button color="red" @click="chechOTP">تایید</u-button>
  </div>
</template>