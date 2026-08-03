import { useState } from "react"
import { getFollowing, getFollowers, getFollowRequests, acceptFollowRequest, rejectFollowRequest } from "../services/user.api"

export function useFollow() {
    const [following, setFollowing] = useState([])
    const [followers, setFollowers] = useState([])
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(false)

    const loadAll = async () => {
        setLoading(true)
        try {
            const [followingRes, followersRes, requestsRes] = await Promise.all([
                getFollowing(),
                getFollowers(),
                getFollowRequests()
            ])

            setFollowing(followingRes.following)
            setFollowers(followersRes.followers)
            setRequests(requestsRes.requests)
        } finally {
            setLoading(false)
        }
    }

    const handleAccept = async (username) => {
        await acceptFollowRequest(username)
        setRequests(prev => prev.filter(e => e.follower !== username))
        setFollowers(prev => [...prev, { username }])
    }

    const handleReject = async (username) => {
        await rejectFollowRequest(username)
        setRequests(prev => prev.filter(e => e.follower !== username))
    }

    return {
        following, followers, requests, loading, loadAll, handleAccept, handleReject
    }
}