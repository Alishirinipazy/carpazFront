<script setup lang="ts">
const { public: { apiBase } } = useRuntimeConfig()
const { data: brandsData } = await useFetch(`${apiBase}/brands`)
const brands = computed(() => (brandsData.value?.data ?? []).slice(0, 5))
</script>

<template>
  <footer class="relative bg-secColor rounded-t-3xl px-6 py-12 text-cyan-50 ">
    <u-container>
      <div class="flex flex-wrap justify-center lg:grid lg:grid-flow-col py-5 grid-cols-3 sm:grid-rows-3">

        <div class="row-span-5">
          <img src="/images/logo.webp" alt="نمایشگاه خودرو" class="w-6/12">
          <h6 class="text-mainColor px-5">همراه مطمئن خرید خودروی تو</h6>
          <p class="py-2 px-5">پلتفرم فروش خودروی نو و کارکرده، در کوتاه ترین زمان</p>
        </div>

        <div class="row-span-3 flex lg:justify-around justify-center">
          <div class="text-center lg:text-right">
            <h5 class="text-2xl py-3 text-mainColor">منو</h5>
            <ul>
              <li class="p-2"><nuxt-link to="/">خانه</nuxt-link></li>
              <li class="p-2"><nuxt-link to="/cars">آگهی‌های خودرو</nuxt-link></li>
              <li class="p-2"><nuxt-link to="/about">درباره ما</nuxt-link></li>
              <li class="p-2"><nuxt-link to="/contact">تماس با ما</nuxt-link></li>
            </ul>
          </div>
          <div class="text-center lg:text-right">
            <h5 class="text-2xl py-3 text-mainColor">برندهای پرطرفدار</h5>
            <ul>
              <li v-for="b in brands" :key="b.id" class="p-2">
                <nuxt-link :to="`/cars?brand=${b.id}`">{{ b.name }}</nuxt-link>
              </li>
            </ul>
          </div>
        </div>

        <div class="row-span-3 lg:text-right text-center">

          <h5 class="text-2xl py-3 text-mainColor lg:block hidden">تماس با ما</h5>
          <p class="py-2"></p>
          <a class="py-2 block" href="tel:+989372396496">09372396496</a>
          <a class="py-2 block" href="mailto:magedshirinipazy@gmail.com">car@alipaz.com</a>
        </div>
      </div>

      <div class="h-px bg-white/10 my-4"></div>
      <p class="text-center text-xs text-white/40">© {{ new Date().getFullYear() }} تمامی حقوق محفوظ است.</p>
    </u-container>
  </footer>
</template>
