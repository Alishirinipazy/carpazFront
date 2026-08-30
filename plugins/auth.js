export default defineNuxtPlugin(async (nuxtApp) => {
    const { authUser } = useAuth();

    try {
        const user = await $fetch('/api/auth/me', {
            headers: useRequestHeaders(['cookie'])
        })

        authUser.value = user;

        if (user && process.client) {
            const { useFavoritesStore } = await import('~/stores/favorites');
            const favorites = useFavoritesStore();
            await favorites.fetchAll();
        }
    } catch (error) {
        authUser.value = null;
    }
})