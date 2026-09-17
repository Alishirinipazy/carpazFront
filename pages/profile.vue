<script setup>
definePageMeta({
  middleware:'auth'
})
useHead({
  title: 'اکانت'
})
useSeoMeta({ robots: 'noindex, nofollow' })

</script>
<template>
  <layouts-header :fixed="true"/>
  <nuxt-layout name="profile">
    <nuxt-page />
  </nuxt-layout>
</template>