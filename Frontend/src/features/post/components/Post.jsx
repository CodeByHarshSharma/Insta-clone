import { useState } from "react";
import 'remixicon/fonts/remixicon.css'


function timeAgo(date) {
    const seconds = Math.floor((Date.now() - new Date(date)) / 1000)
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h`
    return `${Math.floor(hours / 24)}d`
}


const Post = ({ user, post, handleLike, handleUnLike }) => {
    const [isLiked, setIsLiked] = useState(post.isLiked);
    const [isSaved, setIsSaved] = useState(false);

    const handleLikeButton = async () => {
        if (isLiked) {
            await handleUnLike(post._id);
            setIsLiked(false);
        } else {
            await handleLike(post._id);
            setIsLiked(true);
        }
    };
    const isText = post.type === 'text'

    return (
        <article className={isText ? "post post--text" : "post"}>
            <div className="user">
                <div className="img-wrapper">
                    <img src={user.profileImage} alt={user.username} />
                </div>
                <div className="user-meta">
                    <p>{user.username}</p>
                    {post.createdAt && <span className="timestamp">{timeAgo(post.createdAt)}</span>}
                </div>
                {post.category && post.category !== 'general' && (
                    <span className="category-tag">{post.category}</span>
                )}
            </div>

            {isText ? (
                <div className="text-post-body">
                    <p>{post.content}</p>
                </div>
            ) : (
                <img src={post.imgUrl} alt={post.caption || "Post"} loading="lazy" />
            )}

            <div className="icons">
                <div className="left">
                    <button onClick={handleLikeButton} aria-label="Like post" >
                        <i className={isLiked ? "ri-heart-fill like" : "ri-heart-line"}></i>
                    </button>
                    <button aria-label="Comment">
                        <i className="ri-chat-3-line"></i>
                    </button>
                    <button aria-label="Share">
                        <i className="ri-send-plane-line"></i>
                    </button>
                </div>
                <div className="right">
                    <button onClick={() => setIsSaved(!isSaved)} aria-label="Save post" >
                        <i className={isSaved ? "ri-bookmark-fill" : "ri-bookmark-line"} ></i>
                    </button>
                </div>
            </div>

            {!isText && (
                <div className="bottom">
                    <p className="caption">
                        {post.caption}
                    </p>
                </div>
            )}

        </article>
    );
};

export default Post;