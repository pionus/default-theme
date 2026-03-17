export async function getArticles(page = 1, limit = 20) {
    const res = await fetch(`/api/articles?page=${page}&limit=${limit}`)
    return res.json()
}

export async function getArticle(slug) {
    const res = await fetch(`/api/articles/${slug}`)
    return res.json()
}

export default { getArticles, getArticle }
