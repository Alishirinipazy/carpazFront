<script setup lang="ts">
const { public: { apiBase } } = useRuntimeConfig()
const { data } = await useFetch(`${apiBase}/filter-options`)
const brands = computed(() => data.value?.data?.brands ?? [])
</script>

<template>
  <section v-if="brands.length" class="my-8">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-extrabold text-secColor">جستجو بر اساس برند</h2>
      <NuxtLink to="/cars" class="text-mainColor text-sm font-bold flex items-center gap-1">
        مشاهده همه
        <UIcon name="material-symbols:arrow-circle-left-outline-rounded" />
      </NuxtLink>
    </div>

    <div class="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
      <NuxtLink v-for="b in brands" :key="b.id" :to="`/cars?brand=${b.id}`"
                class="flex flex-col items-center gap-2 p-4 min-w-[92px] rounded-2xl border border-gray-100 hover:border-mainColor hover:shadow-md transition-all shrink-0">
        <div class="w-10 h-10 flex items-center justify-center">
          <img v-if="b.logo" :src="b.logo" class="max-w-full max-h-full object-contain" :alt="b.name" />
          <UIcon v-else name="mdi:car-side" class="w-7 h-7 text-secColor" />
        </div>
        <span class="text-xs text-gray-500 truncate w-full text-center">{{ b.name }}</span>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none }
</style>
