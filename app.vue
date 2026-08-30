<script setup>
useHead({
  titleTemplate: '%s | نمایشگاه خودرو',
})
</script>

<template>
  <NuxtLoadingIndicator color="#ffbe33"/>
  <nuxt-page/>
  <UNotifications/>
  <!-- چت‌بات روی همه صفحات -->
  <ClientOnly>
    <ChatBot/>
  </ClientOnly>
</template>

<style>
body {
  @apply bg-slate-200
}
</style>
