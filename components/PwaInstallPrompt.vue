<!--
  یک نوار پایین صفحه که وقتی مرورگر اجازه نصب اپلیکیشن (PWA) رو بده نمایش داده
  میشه و کاربر می‌تونه با یک کلیک سایت رو روی موبایل/دسکتاپ نصب کنه.
-->
<template>
    <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="translate-y-full opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-full opacity-0"
    >
        <div
            v-if="pwa?.showInstallPrompt"
            class="fixed bottom-4 inset-x-4 z-50 md:right-4 md:left-auto md:w-[360px]"
        >
            <div class="bg-secColor text-white rounded-2xl shadow-2xl p-4 flex items-center gap-3">
                <img src="/pwa-icons/pwa-64x64.png" class="w-10 h-10 shrink-0" alt="کارپاز" />
                <div class="flex-1">
                    <p class="font-bold text-sm">نصب اپلیکیشن کارپاز</p>
                    <p class="text-xs text-white/70">سریع‌تر و بدون مرورگر، از صفحه اصلی موبایل‌تون باز کنید</p>
                </div>
                <button
                    @click="pwa.cancelInstall()"
                    class="text-white/50 hover:text-white text-lg leading-none px-1"
                    aria-label="بستن"
                >
                    &times;
                </button>
            </div>
            <button
                @click="pwa.install()"
                class="w-full mt-2 bg-mainColor hover:bg-mainColor/90 text-white font-bold rounded-xl py-2.5 text-sm transition"
            >
                نصب کن
            </button>
        </div>
    </Transition>
</template>

<script setup>
const { $pwa: pwa } = useNuxtApp()
</script>
