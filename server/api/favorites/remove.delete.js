export default defineEventHandler(async (event) => {
    const { public: { apiBase } } = useRuntimeConfig()
    const token = getCookie(event, 'token')
    const query = getQuery(event) // ?carId=

    try {
        const data = await $fetch(`${apiBase}/favorites/${query.carId}`, {
            method: 'DELETE',
            headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
        })
        return data.data
    } catch (error) {
        throw createError({ statusCode: error.response?.status || 500, data: error.data })
    }
})
