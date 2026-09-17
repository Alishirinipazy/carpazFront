<!--
  گیت ورود درون-صفحه‌ای: هر جا کاربر باید قبل از یک اقدام (ثبت درخواست خرید،
  فروش ماشین و..) لاگین کنه، به‌جای پرش به صفحه‌ی /auth/login همین کامپوننت
  رو (بدون لوگو که شلوغ نشه) همون‌جا نشون بده. بعد از تایید کد، رویداد
  "verified" ساطع میشه تا صفحه‌ی والد فرم اصلی رو نشون بده.
-->
<template>
  <div>
    <AuthLogin v-if="!showOtp" embedded @show-check-otp-form="onOtpRequested" />
    <AuthCheckOTP v-else embedded :cellphone="cellphone" @verified="$emit('verified')" />
  </div>
</template>

<script setup>
defineEmits(['verified'])

const showOtp = ref(false)
const cellphone = ref('')

function onOtpRequested(phone) {
  cellphone.value = phone
  showOtp.value = true
}
</script>
