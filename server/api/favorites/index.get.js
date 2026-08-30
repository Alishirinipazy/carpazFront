export default defineEventHandler(async (event) => {
    const { public: { apiBase } } = useRuntimeConfig()
    const token = getCookie(event, 'token')
    if (!token) return []

    try {
        const data = await $fetch(`${apiBase}/favorites`, {
            headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
        })
        return data.data
    } catch (error) {
        return []
    }
})
