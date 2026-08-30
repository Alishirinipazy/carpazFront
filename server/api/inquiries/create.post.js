export default defineEventHandler(async (event) => {
    const { public: { apiBase } } = useRuntimeConfig()
    const token = getCookie(event, 'token')
    const body = await readBody(event)

    try {
        const data = await $fetch(`${apiBase}/inquiries`, {
            method: 'POST', body,
            headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }
        })
        return data.data
    } catch (error) {
        throw createError({ statusCode: error.response?.status || 500, data: error.data })
    }
})
