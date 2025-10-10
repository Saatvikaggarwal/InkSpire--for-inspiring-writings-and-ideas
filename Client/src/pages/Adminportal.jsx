import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useDeletePostMutation,
  useFetchPostsByUserIdQuery,
  useFetchUserQuery,
} from '../services/api';
import Loader from '../components/Loader';
import axios from 'axios';
import './Adminportal.css';

const Adminportal = () => {
  const navigate = useNavigate();

  // Fetch logged-in user
  const {
    data: userResponse,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useFetchUserQuery();

  // Fetch posts of the logged-in user
  const {
    data: posts,
    isLoading,
    isError,
  } = useFetchPostsByUserIdQuery();

  const [likeCounts, setLikeCounts] = useState({});
  const [delPost] = useDeletePostMutation();

  useEffect(() => {
    if (posts) {
      posts.forEach((p) => countLikes(p.id));
    }
  }, [posts]);

  // Fetch likes via axios (can't use hooks inside functions)
  async function countLikes(postId) {
    try {
      const res = await axios.get(`http://localhost:4444/api/like/${postId}`, {
        withCredentials: true,
      });
      setLikeCounts((prev) => ({
        ...prev,
        [postId]: res.data.likes || 0,
      }));
    } catch (err) {
      console.error('Error fetching likes for post:', postId, err);
    }
  }

  const routeToPost = () => {
    navigate('/admin/new');
  };

  async function deletePost(id) {
    try {
      await delPost(id);
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  }

  if (isUserLoading || isLoading) {
    return (
      <div className="loader-wrapper">
        <Loader />
      </div>
    );
  }

  return (
    <div className="admin-container">
      <button className="new-btn" onClick={routeToPost}>
        + New Post
      </button>

      <ul className="post-list">
        {posts?.map((p) => (
          <li key={p.id} className="post-item">
            <div className="post-content">
              <span className="post-title">{p.title}</span>
              <span>Likes: {likeCounts[p.id] || 0}</span>
            </div>
            <div className="btn-group">
              <button
                className="edit-btn"
                onClick={() => navigate(`/admin/edit/${p.id}`)}
              >
                Edit
              </button>
              <button className="delete-btn" onClick={() => deletePost(p.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Adminportal;
