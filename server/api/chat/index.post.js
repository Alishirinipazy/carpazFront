export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { messages, carSlug } = body
    const { public: { apiBase } } = useRuntimeConfig()
    const token = getCookie(event, 'token')

    try {
        const data = await $fetch(`${apiBase}/chat`, {
            method: 'POST',
            body: {
                messages,
                car_slug: carSlug || null,
            },
            headers: {
                'Accept': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            }
        })

        return data.data // { reply, action_completed, cars }
    } catch (error) {
        console.error('AI assistant error:', error)
        throw createError({ statusCode: error.response?.status || 500, message: 'خطا در اتصال به دستیار هوشمند' })
    }
})
