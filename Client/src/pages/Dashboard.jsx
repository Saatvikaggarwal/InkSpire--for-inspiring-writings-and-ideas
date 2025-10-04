import React from "react";
import { useFetchPostsQuery } from "../services/api";
import Loader from "../components/Loader";
import LikeButton from "../components/LikeButton";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const { data, isLoading, isError } = useFetchPostsQuery();
  const navigate = useNavigate();

  if (isLoading) return <Loader />;
  if (isError) return <p className="error-text">Failed to load posts.</p>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📚 All Posts</h1>
      <ul className="post-list">
        {data?.map((post) => (
          <li key={post.id} className="post-item">
            <div
              className="post-info"
              onClick={() => navigate(`/dashboard/show/${post.id}`)}
            >
              <h3 className="post-title">{post.title}</h3>
              <p className="post-author">by {post.author.username}</p>
            </div>

            {/* Like button */}
            <div
              className="like-button-wrapper"
              // Stop click propagation so it doesn't trigger navigation
              onClick={(e) => e.stopPropagation()}
            >
              <LikeButton postId={post.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
