export default defineEventHandler(async (event) => {
    const { public: { apiBase } } = useRuntimeConfig()
    const token = getCookie(event, 'token')
    const query = getQuery(event)

    try {
        const data = await $fetch(`${apiBase}/profile/inquiries`, {
            query,
            headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
        })
        return data.data
    } catch (error) {
        throw createError({ statusCode: error.response?.status || 500, data: error.data })
    }
})
