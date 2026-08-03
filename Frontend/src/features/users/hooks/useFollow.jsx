import { useState } from "react"
import { getFollowing, getFollowers, getFollowRequests, acceptFollowRequest, rejectFollowRequest, getUsers, followUser, unFollowUser } from "../services/user.api"

export function useFollow() {
    const [following, setFollowing] = useState([])
    const [followers, setFollowers] = useState([])
    const [requests, setRequests] = useState([])
    const [users, setUsers] = useState([])
    const [requestedUsers, setRequestedUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const loadAll = async () => {
        setLoading(true)
        try {
            const [followingRes, followersRes, requestsRes, userRes] = await Promise.all([
                getFollowing(),
                getFollowers(),
                getFollowRequests(),
                getUsers()
            ])
            setFollowing(followingRes.following)
            setFollowers(followersRes.followers)
            setRequests(requestsRes.requests)
            setUsers(userRes.users)

        } catch (error) {

            console.error("Failed to load follow data:", error)

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

    const handleFollow = async (username) => {
        try {
            await followUser(username)
            setRequestedUsers(prev => {
                if (prev.includes(username)) {
                    return prev
                }
                return [...prev, username]
            })
        } catch (error) {
            console.error("Failed to follow user:", error)
        }
    }

    const handleUnfollow = async (username) => {
        try {
            await unFollowUser(username)
            setFollowing(prev =>
                prev.filter(
                    user => user.username !== username
                )
            )
        } catch (error) {
            console.error("Failed to unfollow user:", error)
        }
    }

    return {
        following, followers, requests, loading, loadAll, users, requestedUsers, handleAccept, handleReject, handleFollow, handleUnfollow
    }
}