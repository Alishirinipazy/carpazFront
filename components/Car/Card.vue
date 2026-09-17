<script setup>
import { numberFormat } from '~/utils/helper'

const props = defineProps(['car'])

const conditionBadge = computed(() => {
  if (!props.car) return null
  if (props.car.condition_value === 1) return { label: 'خودروی نو', class: 'bg-emerald-500' }
  if (props.car.mileage_km < 20000) return { label: 'کارکرد کم', class: 'bg-blue-500' }
  return null
})
</script>

<template>
  <div class="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
    <div class="relative">
      <NuxtLink :to="`/cars/${car?.slug}`">
        <img :src="car?.primary_image || '/images/preloader.png'"
             :alt="car?.title ? `${car.title} - کارپاز` : 'آگهی خودرو - کارپاز'"
             loading="lazy"
             class="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
      </NuxtLink>

      <span v-if="conditionBadge"
            :class="conditionBadge.class"
            class="absolute top-3 right-3 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
        {{ conditionBadge.label }}
      </span>

      <CarFavoriteButton :car-id="car?.id" class="absolute top-3 left-3" />
    </div>

    <div class="p-4">
      <NuxtLink :to="`/cars/${car?.slug}`">
        <h3 class="font-bold text-secColor truncate hover:text-mainColor transition-colors">
          {{ car?.title }}
        </h3>
      </NuxtLink>
      <p class="text-xs text-gray-400 mb-2">{{ car?.brand }} · {{ car?.model_name }}</p>

      <div class="flex items-center gap-3 text-[11px] text-gray-500 border-y border-gray-50 py-2 my-2">
        <span class="flex items-center gap-1">
          <UIcon name="mdi:speedometer" class="w-3.5 h-3.5" />
          {{ numberFormat(car?.mileage_km) }} کیلومتر
        </span>
        <span class="flex items-center gap-1">
          <UIcon name="mdi:gas-station" class="w-3.5 h-3.5" />
          {{ car?.fuel_type_label }}
        </span>
        <span class="flex items-center gap-1">
          <UIcon name="mdi:calendar" class="w-3.5 h-3.5" />
          {{ car?.model_year }}
        </span>
      </div>

      <div class="flex items-center justify-between">
        <p class="text-secColor">
          <span class="text-sporty-num text-lg text-mainColor">{{ numberFormat(car?.effective_price) }}</span>
          <span class="text-xs font-normal text-gray-400 mr-1">تومان</span>
        </p>
        <NuxtLink :to="`/cars/${car?.slug}`" class="text-mainColor text-xs font-bold hover:underline">
          مشاهده جزئیات
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
