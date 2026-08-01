import React, { useEffect } from 'react'
import '../style/feed.css'
import 'remixicon/fonts/remixicon.css'
import { usePost } from '../hooks/usePost'
import Post from '../components/Post'

const Feed = () => {

    const{ feed, handleGetFeed, loading } = usePost()

    useEffect(() => {
        handleGetFeed()
    },[])

    if(loading || !feed){
        return (<main><h1>Feed is Loading...</h1></main>)
    }

    return (
        <main className='feed-page'>
            <div className="feed">
                <div className="posts">
                    {feed.map(post => {
                        return <Post user={post.user} post={post} />
                    })}
                </div>
            </div>
        </main>
    )
}

export default Feed
