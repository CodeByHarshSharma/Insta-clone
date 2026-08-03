import { useState } from "react";
import 'remixicon/fonts/remixicon.css'

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

    return (
        <article className="post">
            <div className="user">
                <div className="img-wrapper">
                    <img src={user.profileImage} alt={user.username} />
                </div>
                <p>{user.username}</p>
            </div>
            <img src={post.imgUrl} alt={post.caption || "Post"} loading="lazy" />
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

            <div className="bottom">
                <p className="caption">
                    {post.caption}
                </p>
            </div>

        </article>
    );
};

export default Post;