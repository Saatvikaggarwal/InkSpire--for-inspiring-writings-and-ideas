import React from 'react'
import { useFetchPostsQuery } from '../services/api';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // ✅ Import CSS

const Dashboard = () => {
  const { data, isLoading, isError } = useFetchPostsQuery();
  const navigate = useNavigate();

  if (isLoading) return <Loader />;
  if (isError) return <p className="error-text">Failed to load posts.</p>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📚 All Posts</h1>
      <ul className="post-list">
        {data?.map((p) => (
          <li
            key={p.id}
            className="post-item"
            onClick={() => navigate(`/dashboard/show/${p.id}`)}
          >
            <div className="post-info">
              <h3 className="post-title">{p.title}</h3>
              <p className="post-author">by {p.author.username}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard;
