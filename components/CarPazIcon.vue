<script setup lang="ts">
const props = withDefaults(defineProps<{
  name?: 'finance' | 'trust' | 'price' | 'service' | 'search' | 'sell' | 'brand'
  size?: number | string
}>(), { name: 'brand', size: 44 })

const icons = {
  finance: { label: 'تسهیلات خرید', paths: ['<path d="M11 25h38v23H11z" fill="none" stroke="currentColor" stroke-width="2.8"/>','<path d="M7 25 30 9l23 16M17 25V18h26v7M20 48V36h8v12M36 48V36h8v12" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/>','<circle cx="48" cy="43" r="9" fill="#08090b" stroke="#ff172f" stroke-width="2.8"/>','<path d="M48 38v10M44.5 41.2c.8-1.1 2.1-1.7 3.5-1.7 2.1 0 3.7 1.2 3.7 2.8 0 3.7-7.2 1.5-7.2 5.1 0 1.5 1.5 2.7 3.6 2.7 1.5 0 2.8-.6 3.6-1.7" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>'] },
  trust: { label: 'اعتماد و کارشناسی', paths: ['<path d="M30 5 52 13v18c0 14-9 25-22 30C17 56 8 45 8 31V13L30 5Z" fill="#08090b" stroke="currentColor" stroke-width="2.8"/>','<path d="m18 30 8 8 17-18" fill="none" stroke="#ff172f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>','<path d="M30 12v39M19 22h22" stroke="#fff" stroke-width="1.4" opacity=".35"/>'] },
  price: { label: 'قیمت گذاری شفاف', paths: ['<path d="m30 6 7 6 9-1 1 9 7 6-6 7 1 9-9 1-7 7-7-7-9-1 1-9-6-7 7-6 1-9 9 1 7-6Z" fill="#08090b" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/>','<path d="M23 26h14M23 34h14" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>','<path d="M27 21v18M33 21v18" stroke="#ff172f" stroke-width="2" stroke-linecap="round"/>','<path d="M18 47h24" stroke="#fff" stroke-width="2" opacity=".45"/>'] },
  service: { label: 'خدمات تخصصی', paths: ['<path d="M14 31h32l-3-12H17l-3 12Z" fill="#08090b" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/>','<path d="M10 31h40v13H10zM17 44v6M43 44v6M17 25h26" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/>','<circle cx="19" cy="37" r="3.5" fill="#ff172f"/><circle cx="41" cy="37" r="3.5" fill="#ff172f"/>','<path d="M23 19h14M26 14h8" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".55"/>','<path d="m48 11 4 4-11 11-5 1 1-5 11-11Z" fill="#ff172f" stroke="#08090b" stroke-width="2" stroke-linejoin="round"/>'] },
  search: { label: 'جستجوی خودرو', paths: ['<path d="M12 34c1-8 7-13 15-14l5-7h10l6 7c6 1 10 6 11 14" fill="#08090b" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/>','<path d="M12 34h47v9H12z" fill="#08090b" stroke="currentColor" stroke-width="2.8"/>','<circle cx="22" cy="43" r="6" fill="#08090b" stroke="#ff172f" stroke-width="2.8"/><circle cx="50" cy="43" r="6" fill="#08090b" stroke="#ff172f" stroke-width="2.8"/>','<circle cx="49" cy="19" r="8" fill="#ff172f" stroke="#08090b" stroke-width="2.8"/><path d="m54.5 24.5 5 5" stroke="#08090b" stroke-width="2.8" stroke-linecap="round"/>'] },
  sell: { label: 'فروش خودرو', paths: ['<path d="M8 36c2-9 8-14 18-15l5-7h11l5 7c8 1 13 6 15 15" fill="#08090b" stroke="currentColor" stroke-width="2.8"/>','<path d="M9 36h54v9H9z" fill="#08090b" stroke="currentColor" stroke-width="2.8"/>','<circle cx="21" cy="45" r="6" fill="#08090b" stroke="#ff172f" stroke-width="2.8"/><circle cx="51" cy="45" r="6" fill="#08090b" stroke="#ff172f" stroke-width="2.8"/>','<path d="M18 28h11M34 28h12" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".6"/>','<path d="M48 8v15M42 17l6 6 6-6" fill="none" stroke="#ff172f" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>'] },
  brand: { label: 'CarPaz', paths: ['<path d="M7 36c4-15 15-24 23-24s19 9 23 24" fill="none" stroke="currentColor" stroke-width="3.2"/>','<path d="M10 31c6-12 13-17 20-17s14 5 20 17" fill="none" stroke="#ff172f" stroke-width="4"/>','<path d="M14 42c2-6 7-9 14-10l3-5h8l4 5c6 1 10 4 12 10l1 8H12l2-8Z" fill="#08090b" stroke="#fff" stroke-width="2.8" stroke-linejoin="round"/>','<path d="M29 27h9l5 7H24l5-7Z" fill="#08090b" stroke="#fff" stroke-width="2"/>','<circle cx="24" cy="50" r="5.5" fill="#08090b" stroke="#ff172f" stroke-width="2.8"/><circle cx="44" cy="50" r="5.5" fill="#08090b" stroke="#ff172f" stroke-width="2.8"/>','<path d="M18 58h32M26 61c4 3 12 3 16 0" stroke="#ff172f" stroke-width="2.5" stroke-linecap="round"/>','<path d="M21 40h6M37 40h6" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>'] }
} as const

const icon = computed(() => icons[props.name])
const dimension = computed(() => typeof props.size === 'number' ? `${props.size}px` : props.size)
</script>

<template>
  <svg :width="dimension" :height="dimension" viewBox="0 0 64 64" role="img" :aria-label="icon.label" xmlns="http://www.w3.org/2000/svg" class="carpaz-icon">
    <title>{{ icon.label }}</title>
    <g v-for="(path, index) in icon.paths" :key="index" v-html="path" />
  </svg>
</template>

<style scoped>
.carpaz-icon { display: block; overflow: visible; }
</style>
