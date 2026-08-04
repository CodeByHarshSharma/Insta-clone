import { createPost, getFeed, likePost, unLikePost } from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../post.context";

export function usePost(){
    const context = useContext(PostContext)
    const { loading, setLoading, feed, setFeed } = context

    const handleGetFeed = async () => {
        setLoading(true)
        try {
            const data = await getFeed()
            setFeed(data.posts)
        } catch (error) {
            console.error(error)
            setFeed([])
        } finally {
            setLoading(false)
        }
    }

    const handleCreatePost = async (imageFile, caption) => {
        setLoading(true)
        try {
            const data = await createPost(imageFile, caption)
            setFeed(feed ? [data.post, ...feed] : [data.post])
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    const handleLike = async (post) => {
        try {
            await likePost(post)
        } catch (error) {
            console.error(error)
        }
    }
    const handleUnLike = async (post) => {
        try {
            await unLikePost(post)
        } catch (error) {
            console.error(error)
        }
    }
    return {
        loading, feed, handleGetFeed, handleCreatePost, handleLike, handleUnLike    
    }
}