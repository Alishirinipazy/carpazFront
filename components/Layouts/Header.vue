<script setup lang="ts">
const favorites = useFavoritesStore()
const isOpen = ref(false)
const classHeader = ref('header');
const { authUser } = useAuth();
const props = defineProps(['fixed'])

if (!favorites.loaded) favorites.fetchAll()

if (props?.fixed) {
  classHeader.value = "header-block"
} else {
  classHeader.value = "header"
  onMounted(() => {
    window.onscroll = () => {
      if (document.documentElement.scrollTop <= 200) {
        classHeader.value = "header"
      } else {
        classHeader.value = "header-scroll"
      }
    }
  })
}
</script>
<template>
  <header class="transition-all text-cyan-50 duration-700 ease-in-out z-110" :class="classHeader">
    <u-container>
      <div class="flex justify-between lg:justify-around md:justify-around items-center w-full">

        <div class="hidden lg:flex w-1/3 justify-center">
          <ul class="flex">
            <li class="px-2" :class="{'text-mainColor': $route.path==='/'}">
              <nuxt-link to="/">خانه</nuxt-link>
            </li>
            <li class="px-2">
              <nuxt-link to="/cars" :class="{'text-mainColor': $route.path.includes('/cars')}">
                آگهی‌های خودرو
              </nuxt-link>
            </li>
            <li class="px-2">
              <nuxt-link to="/about" :class="{'text-mainColor': $route.path==='/about'}">درباره ما</nuxt-link>
            </li>
            <li class="px-2">
              <nuxt-link to="/contact" :class="{'text-mainColor': $route.path==='/contact'}">تماس با ما</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="w-1/3 flex justify-center">
          <nuxt-link to="/">
            <img src="/images/logo2.webp" class="w-[110px]" alt="">
          </nuxt-link>
        </div>
        <div class="w-1/3 flex justify-end items-center mx-1">

          <NuxtLink to="/sell-your-car" class="hidden lg:block">
            <UButton class="rounded-full mx-1" icon="mdi:cash-fast" color="white" variant="solid"
                     :ui="{ color: { white: { solid: 'bg-white text-secColor hover:bg-gray-100 font-bold' } } }">
              فروش ماشین شما
            </UButton>
          </NuxtLink>

          <div class="hidden lg:block">
            <NuxtLink to="/favorites">
              <UButton class="rounded-full mx-1" icon="mdi:cards-heart" color="red">
                <UChip :text="favorites.items.length" v-if="favorites.items.length" size="lg" :ui="{background:'bg-secColor'}"></UChip>
              </UButton>
            </NuxtLink>
          </div>
          <nuxt-link to="/auth/login" v-if="!authUser">
            <UButton color="red" class="mx-2" :ui="{ rounded: 'rounded-full' }">
              <span class="hidden md:block">ثبت نام | ورود</span>
              <UIcon name="octicon:sign-in-16" class="w-5 h-5"/>
            </UButton>
          </nuxt-link>
          <nuxt-link to="/profile/" v-else :class="{'text-amber-400': $route.path.includes('profile')}">
            <UButton color="red" class="mx-2" :class="{'bg-cosColor': $route.path.includes('profile')}"
                     :ui="{ rounded: 'rounded-full' }">
              <span class="hidden md:block">{{ authUser?.name }}</span>
              <UIcon name="material-symbols:account-circle" class="w-5 h-5"/>
            </UButton>
          </nuxt-link>
        </div>
      </div>
    </u-container>

    <!-- منوی موبایل پایین صفحه -->
    <div class="fixed lg:hidden bottom-0 flex justify-center w-screen z-20 bg-secColor"
         :class="{'hidden': $route.path.includes('profile')}">
      <div class="flex text-center">
        <nuxt-link to="/" class="header-item" :class="{'text-amber-400': $route.path==='/'}">
          <UIcon name="material-symbols:other-houses" class="w-5 h-5"/>
          <p>خانه</p>
        </nuxt-link>
        <nuxt-link to="/cars" class="header-item" :class="{'text-amber-400': $route.path.includes('/cars')}">
          <UIcon name="bxs:category" class="w-5 h-5"/>
          <p>آگهی‌ها</p>
        </nuxt-link>
        <nuxt-link to="/favorites" class="header-item">
          <UChip :text="favorites.items.length" v-if="favorites.items.length" size="lg" :ui="{background:'bg-amber-400'}">
            <UIcon name="mdi:cards-heart" class="w-5 h-5"/>
          </UChip>
          <p>علاقه‌مندی</p>
        </nuxt-link>
        <nuxt-link to="/sell-your-car" class="header-item" :class="{'text-amber-400': $route.path==='/sell-your-car'}">
          <UIcon name="mdi:cash-fast" class="w-5 h-5"/>
          <p>فروش ماشین</p>
        </nuxt-link>
        <nuxt-link to="/auth/login" class="header-item" v-if="!authUser">
          <UIcon name="octicon:sign-in-16" class="w-5 h-5"/>
          <p>ورود</p>
        </nuxt-link>
        <nuxt-link to="/profile/" v-else class="header-item" :class="{'text-amber-400': $route.path.includes('profile')}">
          <UIcon name="material-symbols:account-circle" class="w-5 h-5"/>
          <p>پروفایل</p>
        </nuxt-link>
      </div>
    </div>
  </header>
</template>
<style>
.header { @apply lg:fixed top-0 w-full z-20 py-2 }
.header-scroll { @apply lg:fixed top-0 w-full z-20 bg-secColor py-1 }
.header-item { @apply flex flex-1 items-center flex-col px-5 py-2 }
.header-item p { @apply text-xs }
.header-block { @apply block bg-secColor py-2 }
</style>
