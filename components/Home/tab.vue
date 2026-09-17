<script setup lang="ts">
const { public: { apiBase } } = useRuntimeConfig();

const tabs = [
  { key: 'recent', label: 'جدیدترین', sort_by: null },
  { key: 'featured', label: 'ویژه', sort_by: 'min' },
  { key: 'popular', label: 'پرتقاضاترین', sort_by: 'bestseller' },
]
const active = ref('recent')

const query = computed(() => {
  const t = tabs.find(t => t.key === active.value)
  return t?.sort_by ? { sort_by: t.sort_by } : {}
})

const { data: menu, pending } = await useFetch(() => `${apiBase}/menu`, { query })
</script>

<template>
  <section class="my-8">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-extrabold text-mainColor ">

        خودرو های کارپــاز</h2>
      <NuxtLink to="/cars" class="text-mainColor text-sm font-bold flex items-center gap-1">
        مشاهده همه
        <UIcon name="material-symbols:arrow-circle-left-outline-rounded" />
      </NuxtLink>
    </div>

    <div class="flex gap-2 border-b border-gray-100 mb-5">
      <button v-for="t in tabs" :key="t.key" @click="active = t.key"
              class="px-4 py-2 text-sm font-bold border-b-2 -mb-px transition-colors"
              :class="active === t.key ? 'border-mainColor text-mainColor' : 'border-transparent text-gray-400'">
        {{ t.label }}
      </button>
    </div>

    <div v-if="!pending && menu?.data?.cars?.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <CarCard v-for="car in menu.data.cars.slice(0, 8)" :key="car.id" :car="car" />
    </div>
    <div v-else-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <GlobalLoaderMenu v-for="n in 8" :key="n" />
    </div>
    <div v-else class="text-center py-16 text-gray-400">فعلاً خودرویی ثبت نشده</div>
  </section>
</template>
