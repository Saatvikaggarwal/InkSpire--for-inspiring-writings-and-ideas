import React, { useState, useEffect } from 'react';
import { useFetchHasLikedQuery, useToggleLikeMutation } from '../services/api';
import './LikeButton.css';

const LikeButton = ({ postId }) => {
    const { data: likedData, isLoading } = useFetchHasLikedQuery(postId);
    const [toggleLike] = useToggleLikeMutation();
    const [liked, setLiked] = useState(false);

    // Sync local state with server response
    useEffect(() => {
        if (likedData) {
            setLiked(likedData.liked);
        }
    }, [likedData]);

    const handleLike = async () => {
        try {
            const res = await toggleLike(postId).unwrap();
            setLiked(res.liked);  // Update instantly from backend response
        } catch (err) {
            console.error("Error toggling like:", err);
        }
    };

    if (isLoading) return null;

    return (
        <div className="like-button" onClick={handleLike}>
            <span className={`heart ${liked ? "liked" : ""}`}>
                {liked ? "❤️" : "🤍"}
            </span>
        </div>
    );
};

export default LikeButton;
