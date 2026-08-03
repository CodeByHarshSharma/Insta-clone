import React from 'react'
import { usePost } from '../hooks/usePost'

const Post = ({user, post, loading, handleLike, handleUnLike}) => {

    return (
        <div className="post">
            <div className="user">
                <div className="img-wrapper">
                    <img src={user.profileImage} alt="" />
                </div>
                <p>{user.username}</p>
            </div>
            <img src={post.imgUrl} alt="" />
            <div className="icons">
                <div className="left">
                    <button><i className={`ri-heart-line ${post.isLiked?"like":""}`}
                               onClick={() => {post.isLiked?handleUnLike(post._id):handleLike(post._id)}}></i></button>
                    <button><i className="ri-chat-1-line"></i></button>
                    <button><i className="ri-send-ins-line"></i></button>
                </div>
                <div className="right">
                    <button><i className="ri-bookmark-line"></i></button>
                </div>
            </div>
            <div className="bottom">
                <p className='caption'>{post.caption}</p>
            </div>
        </div>
    )
}

export default Post
