import axios from "axios";

const api = axios.create({
    baseURL: "/api/users",
    withCredentials: true
})

export async function getFollowing() {
    try {
        const response = await api.get('/following')
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getFollowers() {
    try {
        const response = await api.get('/followers')
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getFollowRequests() {
    try {
        const response = await api.get('/follow/requests')
        return response.data
    } catch (error) {
        throw error
    }
}

export async function acceptFollowRequest(username) {
    try {
        const response = await api.post(`/follow/accept/${username}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function rejectFollowRequest(username) {
    try {
        const response = await api.post(`/follow/reject/${username}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function followUser(username) {
    try {
        const response = await api.post(`/follow/${username}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function unFollowUser(username) {
    try {
        const response = await api.post(`/unfollow/${username}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getUsers() {
    try {
        const response = await api.get("/getUsers");
        return response.data;
    } catch (error) {
        throw error;
    }
}