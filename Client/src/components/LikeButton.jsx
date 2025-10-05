import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import './LikeButton.css';

const LikeButton = ({postId}) => {
    const [liked,setLiked]=useState(false);

    useEffect(() => {
        const fetchLiked = async () => {
            try {
                const res = await axios.get(`http://localhost:4444/api/like/hasLiked/${postId}`, {
                    withCredentials: true,
                });
                setLiked(res.data.liked);
            } catch (err) {
                console.error("Error fetching liked status:", err);
            }
        };
        fetchLiked();
    }, [postId]);

    const handleLike = async () => {
        console.log("handle like");

        try {
            const res = await axios.post(`http://localhost:4444/api/like/toggle/${postId}`, {}, {
                withCredentials: true, 
            });

            if (res.data.liked) {
                setLiked(true);
                // setLikes((prev) => prev + 1);
            } else {
                setLiked(false);
                // setLikes((prev) => prev - 1);
            }
        } catch (err) {
            console.error("Error toggling like:", err);
        }
    };

    return (
        <div className="like-button" onClick={handleLike}>
            <span className={`heart ${liked ? "liked" : ""}`}>
                {liked ? "❤️" : "🤍"}
            </span>
            {/* <span className="like-count">{likes}</span> */}
        </div>
    );
}

export default LikeButton
