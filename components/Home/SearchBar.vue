<script setup lang="ts">
const { public: { apiBase } } = useRuntimeConfig()
const { data } = await useFetch(`${apiBase}/filter-options`)
const opts = computed(() => data.value?.data ?? {})

const form = ref({ condition: '', brand: '', category: '', search: '' })
const router = useRouter()

function submit() {
  const query = {}
  Object.entries(form.value).forEach(([k, v]) => { if (v) query[k] = v })
  router.push({ path: '/cars', query })
}
</script>

<template>
  <form @submit.prevent="submit"
        class="bg-white/95 backdrop-blur rounded-full shadow-xl p-2 flex flex-col md:flex-row items-stretch md:items-center gap-2 max-w-3xl mx-auto">

    <select v-model="form.condition" class="flex-1 bg-transparent text-sm text-secColor px-4 py-2 outline-none">
      <option value="">همه (نو/کارکرده)</option>
      <option value="new">نو</option>
      <option value="used">کارکرده</option>
    </select>

    <div class="hidden md:block w-px h-6 bg-gray-200"></div>

    <select v-model="form.brand" class="flex-1 bg-transparent text-sm text-secColor px-4 py-2 outline-none">
      <option value="">همه برندها</option>
      <option v-for="b in opts.brands" :key="b.id" :value="b.id">{{ b.name }}</option>
    </select>

    <div class="hidden md:block w-px h-6 bg-gray-200"></div>

    <select v-model="form.category" class="flex-1 bg-transparent text-sm text-secColor px-4 py-2 outline-none">
      <option value="">همه انواع</option>
      <option v-for="c in opts.categories" :key="c.id" :value="c.id">{{ c.name }}</option>
    </select>

    <div class="hidden md:block w-px h-6 bg-gray-200"></div>

    <input v-model="form.search" type="text" placeholder="جستجو (مثلا پژو ۲۰۷)"
           class="flex-1 bg-transparent text-sm text-secColor px-4 py-2 outline-none placeholder:text-gray-400" />

    <UButton type="submit" color="yellow" class="rounded-full font-bold px-6 justify-center">
      <UIcon name="material-symbols:search" class="w-4 h-4" />
      جستجو
    </UButton>
  </form>
</template>
