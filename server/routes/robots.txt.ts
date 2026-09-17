export default defineEventHandler((event) => {
    const { public: { siteUrl } } = useRuntimeConfig()

    setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')

    return [
        'User-agent: *',
        'Allow: /',
        'Disallow: /profile',
        'Disallow: /profile/*',
        'Disallow: /auth/*',
        'Disallow: /favorites',
        '',
        `Sitemap: ${siteUrl}/sitemap.xml`,
        '',
    ].join('\n')
})
