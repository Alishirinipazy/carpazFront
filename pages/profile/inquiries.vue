<script setup>
definePageMeta({ layout: 'profile', middleware: 'auth' })
useSeoMeta({ title: 'درخواست‌های خرید من', robots: 'noindex, nofollow' })

const { data, pending } = await useFetch('/api/profile/inquiries', {
    headers: useRequestHeaders(['cookie'])
})

const inquiries = computed(() => data.value?.inquiries ?? [])

// backend sends bootstrap-style names (secondary/info/warning/primary/success/danger/dark) -
// map to literal Tailwind classes so the JIT scanner can see them
const STATUS_CLASSES = {
    secondary: 'bg-gray-400',
    info: 'bg-sky-500',
    warning: 'bg-amber-500',
    primary: 'bg-blue-500',
    success: 'bg-emerald-500',
    danger: 'bg-red-500',
    dark: 'bg-gray-800',
}
function statusClass(color) {
    return STATUS_CLASSES[color] || 'bg-gray-400'
}
</script>

<template>
  <div class="border-2 rounded-2xl mx-3 my-2">
    <div class="flex justify-between items-center p-4 border-b">
      <h5 class="font-bold text-xl text-mainColor">درخواست‌های خرید</h5>
      <p class="text-sm text-gray-400">وضعیت پیگیری‌های تو اینجاست</p>
    </div>

    <div v-if="pending" class="flex justify-center py-10">
      <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 animate-spin text-mainColor"/>
    </div>

    <div v-else-if="!inquiries.length" class="text-center py-10 text-gray-400">
      <p class="text-4xl mb-2">🚗</p>
      <p>هنوز درخواستی ثبت نکردی</p>
      <NuxtLink to="/cars" class="text-mainColor text-sm font-bold mt-2 inline-block">مشاهده آگهی‌ها</NuxtLink>
    </div>

    <div v-else class="divide-y divide-gray-100">
      <div v-for="inquiry in inquiries" :key="inquiry.id" class="p-4 flex items-center gap-3">
        <img :src="inquiry.car_image" class="w-16 h-12 object-cover rounded-xl flex-shrink-0" />

        <div class="flex-1 min-w-0">
          <p class="font-bold text-secColor truncate">{{ inquiry.car_title }}</p>
          <p class="text-xs text-gray-400">{{ inquiry.created_at }}</p>
          <p v-if="!inquiry.car_still_listed" class="text-xs text-gray-400 mt-0.5">
            (این آگهی دیگر در سایت موجود نیست)
          </p>
        </div>

        <span :class="`badge text-white text-xs font-bold px-3 py-1.5 rounded-full ${statusClass(inquiry.status_color)}`">
          {{ inquiry.status_label }}
        </span>
      </div>
    </div>
  </div>
</template>
