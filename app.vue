<script setup>
useHead({
  titleTemplate: '%s | نمایشگاه خودرو',
})
</script>

<template>
  <NuxtLoadingIndicator color="#e10f1f"/>
  <nuxt-page/>
  <UNotifications/>
  <!-- چت‌بات روی همه صفحات -->
  <ClientOnly>
    <ChatBot/>
    <PwaInstallPrompt/>
  </ClientOnly>
</template>

<style>
body {
  @apply bg-slate-200
}
</style>
