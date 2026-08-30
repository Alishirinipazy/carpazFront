<script setup lang="ts">
defineProps(['dataBanner'])
</script>
<template>
  <div class="grid sm:grid-cols-2 gap-5 py-3">
    <div v-for="(item, index) in dataBanner" :key="index" class="row-bg-temp" :style="{ backgroundImage: `url(${item.image})` }">
      <nuxt-link :to="item.link">
        <div class="banner-dis">
          <h4 class="text-xl font-extrabold text-white mb-1">{{ item.title }}</h4>
          <p class="text-white/70 text-sm mb-3">{{ item.dis }}</p>
          <span class="inline-block bg-white text-secColor text-sm font-bold px-4 py-2 rounded-full">شروع کن</span>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>
<style>
.row-bg-temp {
  @apply relative h-[280px] bg-no-repeat bg-cover bg-center rounded-2xl overflow-hidden
}
.banner-dis {
  @apply absolute w-full transition delay-700 duration-300 ease-in-out bottom-0 p-6 bg-gradient-to-t from-secColor/95 to-transparent to-100% rounded-b-2xl
}
</style>
