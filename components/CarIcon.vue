<!--
  ست آیکون اختصاصی کارپاز - همه با یک زبان بصری یکسان (stroke=currentColor،
  ضخامت خط ۱.۶، گوشه‌های گرد) طراحی شدن تا به‌جای آیکون‌های عمومی/بی‌ربط،
  هویت بصری هماهنگ با لوگو و رنگ‌های سایت (mainColor/secColor) داشته باشیم.

  استفاده:  <CarIcon name="wheel" class="w-6 h-6 text-mainColor" />
  رنگ و سایز از طریق کلاس روی خود svg کنترل می‌شه (مثل UIcon).
-->
<script setup>
defineProps({
  name: { type: String, required: true },
})
</script>

<template>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
       stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">

    <!-- ناوبری -->
    <template v-if="name === 'home'">
      <path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9a1 1 0 0 0 1 1h3v-5h4v5h3a1 1 0 0 0 1-1v-9"/>
    </template>
    <template v-else-if="name === 'mail'">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4.5 7 7.5 6 7.5-6"/>
    </template>
    <template v-else-if="name === 'info'">
      <circle cx="12" cy="12" r="8.5"/><line x1="12" y1="11" x2="12" y2="16"/>
      <circle cx="12" cy="8" r="0.9" fill="currentColor" stroke="none"/>
    </template>
    <template v-else-if="name === 'phone'">
      <path d="M7.5 3.5c.5 0 1 .3 1.2.8l1 2.4c.2.5 0 1-.4 1.4L8 9.4c1 2.2 2.7 3.9 4.9 4.9l1.3-1.3c.4-.4.9-.5 1.4-.4l2.4 1c.5.2.8.7.8 1.2v2.1c0 1.1-1 2-2.1 1.8C11 18.4 5.6 13 4.3 7.3 4.1 6.2 5 5.2 6.1 5.2h1.4Z"/>
    </template>
    <template v-else-if="name === 'pin'">
      <path d="M12 21s6.5-5.7 6.5-10.8A6.5 6.5 0 0 0 5.5 10.2C5.5 15.3 12 21 12 21Z"/>
      <circle cx="12" cy="10.2" r="2.3"/>
    </template>
    <template v-else-if="name === 'clock'">
      <circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3.2 2"/>
    </template>
    <template v-else-if="name === 'send'">
      <path d="m21 3-18 7.5 7 2.5m11-10-6.5 17-2-6.5m8.5-10.5-8.5 10.5"/>
    </template>
    <template v-else-if="name === 'message'">
      <path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8c-1 0-2-.2-2.9-.5L4.5 20l1-4.3C4.5 14.5 4 13.3 4 12Z"/>
    </template>

    <!-- ماموریت / چشم‌انداز / داستان -->
    <template v-else-if="name === 'wheel'">
      <circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.6"/>
      <path d="M12 3.5v6"/><path d="m6.2 15.5 5-2.2"/><path d="m17.8 15.5-5-2.2"/><path d="M12 20.5v-3.3"/>
    </template>
    <template v-else-if="name === 'eye'">
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>
    </template>
    <template v-else-if="name === 'flag'">
      <path d="M6 3v18"/><path d="M6 4h11l-3 3.5L17 11H6Z"/>
    </template>

    <!-- مراحل کار -->
    <template v-else-if="name === 'search-car'">
      <circle cx="10.5" cy="10.5" r="6.2"/><line x1="15.1" y1="15.1" x2="20.5" y2="20.5"/>
    </template>
    <template v-else-if="name === 'clipboard-check'">
      <rect x="5.5" y="4.5" width="13" height="16" rx="2"/>
      <path d="M9 4.5V3.8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v.7"/><path d="m9 13 2 2 4-4.5"/>
    </template>
    <template v-else-if="name === 'wrench'">
      <path d="M14.7 3.3a4 4 0 0 0-5.1 5.1l-6.9 6.9a2 2 0 1 0 2.8 2.8l6.9-6.9a4 4 0 0 0 5.1-5.1l-2.4 2.4-1.9-.4-.4-1.9Z"/>
    </template>
    <template v-else-if="name === 'car-key'">
      <circle cx="7" cy="15" r="3.4"/><path d="M9.8 12.4 17 5.2l2 2-1.6 1.6 1.6 1.6-2 2-1.6-1.6-1.8 1.8"/>
    </template>

    <!-- تیم -->
    <template v-else-if="name === 'headset'">
      <path d="M4 13.5v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="13" width="4" height="6" rx="1.3"/>
      <rect x="17" y="13" width="4" height="6" rx="1.3"/><path d="M19 19.5v.5a2.5 2.5 0 0 1-2.5 2.5H14"/>
    </template>
    <template v-else-if="name === 'car-side'">
      <path d="M3 15.5v-2l1.8-3.8A2 2 0 0 1 6.6 8.5h8.9a2 2 0 0 1 1.8 1.1L19 13.5h1.5a.5.5 0 0 1 .5.5v1.5a1 1 0 0 1-1 1H19"/>
      <path d="M3 15.5h1.5M19.5 15.5H16"/><circle cx="7.5" cy="15.7" r="1.8"/><circle cx="16" cy="15.7" r="1.8"/>
      <path d="M6 10.5h11"/>
    </template>
    <template v-else-if="name === 'chat'">
      <path d="M4 5.5h16v10H9.5L6 19v-3.5H4Z"/><line x1="7.5" y1="9" x2="16.5" y2="9"/><line x1="7.5" y1="12" x2="13.5" y2="12"/>
    </template>

    <!-- چرا ما -->
    <template v-else-if="name === 'shield-check'">
      <path d="M12 3.2 5 5.8v5.6c0 4.4 3 7.4 7 9.4 4-2 7-5 7-9.4V5.8Z"/><path d="m9 12 2 2 4-4.5"/>
    </template>
    <template v-else-if="name === 'speed'">
      <circle cx="12" cy="13" r="8"/><path d="M12 13 15.5 9"/><path d="M8 13a4 4 0 0 1 4-4"/>
      <circle cx="12" cy="13" r="0.9" fill="currentColor" stroke="none"/>
    </template>
    <template v-else-if="name === 'price-tag'">
      <path d="M11.5 3.5H18a1 1 0 0 1 1 1v6.5a1 1 0 0 1-.3.7l-7.5 7.5a1 1 0 0 1-1.4 0l-6-6a1 1 0 0 1 0-1.4l7-7a1 1 0 0 1 .7-.3Z"/>
      <circle cx="15.2" cy="7.2" r="1.1"/>
    </template>
    <template v-else-if="name === 'heart'">
      <path d="M12 20s-7.5-4.6-9.4-9.3C1.4 7.6 3 4.8 6 4.4c1.9-.3 3.6.6 4.5 2.2C11.4 5 13.1 4.1 15 4.4c3 .4 4.6 3.2 3.4 6.3C16.5 15.4 12 20 12 20Z"/>
    </template>
    <template v-else-if="name === 'grid'">
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.6"/>
      <rect x="13" y="3.5" width="7.5" height="7.5" rx="1.6"/>
      <rect x="3.5" y="13" width="7.5" height="7.5" rx="1.6"/>
      <rect x="13" y="13" width="7.5" height="7.5" rx="1.6"/>
    </template>
    <template v-else-if="name === 'login'">
      <path d="M10.5 4.5h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h4"/>
      <path d="M14.5 8.2 18.3 12l-3.8 3.8"/><line x1="18" y1="12" x2="8.5" y2="12"/>
    </template>
    <template v-else-if="name === 'account'">
      <circle cx="12" cy="8.3" r="3.6"/><path d="M4.8 19.5c.9-3.9 3.5-6 7.2-6s6.3 2.1 7.2 6"/>
    </template>
    <template v-else-if="name === 'cash'">
      <rect x="2.5" y="6.5" width="19" height="12" rx="2"/><circle cx="12" cy="12.5" r="3"/>
      <path d="M5.5 6.5v-.8a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v.8" opacity="0.55"/>
    </template>

    <!-- عمومی -->
    <template v-else-if="name === 'check'">
      <circle cx="12" cy="12" r="8.5"/><path d="m8.2 12.3 2.6 2.6 5-5.4"/>
    </template>
    <template v-else-if="name === 'calendar'">
      <rect x="4" y="5.5" width="16" height="14.5" rx="2"/><path d="M4 9.5h16"/><path d="M8 3.5v4M16 3.5v4"/>
      <path d="M8.5 13h2M13.5 13h2M8.5 16.5h2M13.5 16.5h2"/>
    </template>
    <template v-else-if="name === 'users'">
      <circle cx="8.5" cy="8.5" r="3"/><path d="M2.7 19c.6-3.3 2.9-5 5.8-5s5.2 1.7 5.8 5"/>
      <circle cx="17" cy="9.5" r="2.4"/><path d="M15.5 14.2c2.4.2 4.2 1.7 4.8 4.8"/>
    </template>

    <!-- fallback: چک ساده -->
    <template v-else>
      <circle cx="12" cy="12" r="8.5"/>
    </template>
  </svg>
</template>
