import axios from 'axios'

const api = axios.create({
    baseURL: '',
    withCredentials: true
})



export async function getFeed(category) {
    const url = category && category !== 'all'
        ? `/api/posts/feed?category=${category}`
        : '/api/posts/feed'
    const response = await api.get(url)
    return response.data
}

export async function createPost({ type, imageFile, caption, content, category }) {

    const formData = new FormData()

    if (type === 'image') {
        formData.append('image', imageFile)
        formData.append('caption', caption)
    } else {
        formData.append('content', content)
    }
    formData.append('category', category || 'general')

    const response = await api.post('/api/posts', formData)

    return response.data
}

export async function likePost(postId) {

    const response = await api.post("/api/posts/like/" + postId)
    return response.data
}

export async function unLikePost(postId){

    const response = await api.post("/api/posts/unlike/" + postId)
    return response.data
}