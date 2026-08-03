import { useState } from 'react'

const Post = ({user, post, handleLike, handleUnLike}) => {

    const [isLiked, setIsLiked] = useState(post.isLiked)

    const handleLikeButton = async () => {
        if(isLiked){
            await handleUnLike(post._id)
            setIsLiked(false)
        }else{
            await handleLike(post._id)
            setIsLiked(true)
        }
    }

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
                    <button onClick={handleLikeButton}><i className={`ri-heart-line ${isLiked?"like":""}`}></i></button>
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
