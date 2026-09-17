export default defineEventHandler(async (event) => {
    const { public: { apiBase } } = useRuntimeConfig()
    const token = getCookie(event, 'token')
    const body = await readBody(event)

    const headers = { 'Accept': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`

    try {
        const data = await $fetch(`${apiBase}/contact-us`, {
            method: 'POST', body, headers
        })
        return data
    } catch (error) {
        throw createError({ statusCode: error.response?.status || 500, data: error.data })
    }
})
