import React, { useEffect } from 'react'
import '../style/feed.css'
import 'remixicon/fonts/remixicon.css'
import { usePost } from '../hooks/usePost'
import Post from '../components/Post'
import Nav from '../../shared/components/Nav'
import Sidebar from '../../users/components/SideBar'

const Feed = () => {

    const{ feed, handleGetFeed, loading, handleLike, handleUnLike } = usePost()

    useEffect(() => {
        handleGetFeed()
    },[])

    if (loading || !feed) {
    return (
        <main className="feed-loading">
            <div className="loading-spinner"></div>
            <p>Loading your feed...</p>
        </main>
    );
}

    return (
        <main className='feed-page'>
            <Nav />
            <div className="feed">
                <div className="posts">
                    {feed.filter(Boolean).map(post => {
                        return <Post key={post._id} user={post.user} post={post} handleLike={handleLike} handleUnLike={handleUnLike} />
                    })}
                </div>
            </div>
            <Sidebar />
        </main>
    )
}

export default Feed
