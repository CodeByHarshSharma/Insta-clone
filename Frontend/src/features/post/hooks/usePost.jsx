import { createPost, getFeed, likePost, unLikePost } from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../post.context";

export function usePost(){
    const context = useContext(PostContext)
    const { loading, setLoading, feed, setFeed } = context

    const handleGetFeed = async () => {

        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts)
        setLoading(false)
    }

    const handleCreatePost = async (imageFile, caption) => {
        setLoading(true)
        const data = await createPost(imageFile, caption)
        setFeed(feed ? [data.post, ...feed] : [data.post])
        setLoading(false)
    }

    const handleLike = async (post) => {
        await likePost(post)
    }

    const handleUnLike = async (post) => {
        await unLikePost(post)
    }

    return {
        loading, feed, handleGetFeed, handleCreatePost, handleLike, handleUnLike    
    }
}
