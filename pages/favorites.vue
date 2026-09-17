<script setup>
definePageMeta({ middleware: 'auth' })

const favorites = useFavoritesStore()
if (!favorites.loaded) await favorites.fetchAll()

useSeoMeta({ title: 'علاقه‌مندی‌ها', robots: 'noindex, nofollow' })
</script>

<template>
  <LayoutsHeader />

  <div class="bg-secColor pt-28 pb-10">
    <UContainer>
      <h1 class="text-white text-2xl font-extrabold">علاقه‌مندی‌های من</h1>
    </UContainer>
  </div>

  <UContainer class="py-8">
    <div v-if="favorites.items.length" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      <CarCard v-for="fav in favorites.items" :key="fav.id"
               :car="{ id: fav.car_id, slug: fav.car_slug, title: fav.car_title, primary_image: fav.car_image, effective_price: fav.price }" />
    </div>
    <div v-else class="text-center py-20 text-gray-400">
      <p class="text-4xl mb-2">🤍</p>
      <p>هنوز خودرویی رو ذخیره نکردی</p>
      <NuxtLink to="/cars" class="text-mainColor text-sm font-bold mt-2 inline-block">مشاهده آگهی‌ها</NuxtLink>
    </div>
  </UContainer>

  <LayoutsFooter />
</template>
