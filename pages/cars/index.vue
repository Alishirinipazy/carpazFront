<script setup lang="ts">
const { public: { apiBase } } = useRuntimeConfig();
const query = ref({});
const route = useRoute();
const isOpen = ref(false)

const { data: menu, pending: pendingMenu, refresh } = await useFetch(() => `${apiBase}/menu`, {
  query: query
});

watch(route, () => {
  query.value = route.query
  isOpen.value = false
  refresh()
})

const links = [
  { label: 'خانه', to: '/' },
  { label: 'آگهی‌های خودرو', to: '/cars' }
]

useHead({ title: 'آگهی‌های خودرو' })
</script>

<template>
  <LayoutsHeader />

  <div class="bg-secColor pt-28 pb-10">
    <UContainer>
      <h1 class="text-white text-2xl font-extrabold">آگهی‌های خودرو</h1>
      <UBreadcrumb dir="rtl" :links="links" class="mt-2" :ui="{ active: 'text-mainColor', base: 'font-light text-gray-300' }" />
    </UContainer>
  </div>

  <UContainer>
    <div class="flex justify-end py-3 lg:hidden">
      <button @click="isOpen = true" class="rounded-xl text-sm bg-secColor text-white px-3 py-2 flex items-center gap-1">
        <UIcon name="material-symbols:filter-alt-sharp" />
        فیلترها
      </button>
    </div>

    <USlideover v-model="isOpen">
      <UCard class="flex flex-col flex-1">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-bold">فیلترها</h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="isOpen = false" />
          </div>
        </template>
        <CarFilter />
      </UCard>
    </USlideover>

    <div class="grid lg:grid-cols-12 gap-4 items-start py-4">
      <div class="hidden lg:block lg:col-span-3">
        <CarFilter />
      </div>

      <div class="col-span-12 lg:col-span-9">
        <p class="text-sm text-gray-400 mb-3" v-if="menu?.data?.meta?.total">
          {{ menu.data.meta.total }} خودرو یافت شد
        </p>

        <div v-if="!pendingMenu && menu?.data?.cars?.length" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <CarCard v-for="car in menu.data.cars" :key="car.id" :car="car" />
        </div>

        <div v-else-if="pendingMenu" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <GlobalLoaderMenu v-for="n in 6" :key="n" />
        </div>

        <div v-else class="text-center py-20 text-gray-400">
          <p class="text-4xl mb-2">🚗</p>
          <p>خودرویی با این مشخصات پیدا نشد</p>
        </div>

        <GlobalPagination :pages="menu?.data?.meta?.links" />
      </div>
    </div>
  </UContainer>

  <LayoutsFooter />
</template>
