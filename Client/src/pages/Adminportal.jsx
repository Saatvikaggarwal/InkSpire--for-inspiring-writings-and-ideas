import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchPostsQuery } from '../services/api';
import Loader from '../components/Loader';
import './Adminportal.css';

const Adminportal = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useFetchPostsQuery();

  const routeToPost = () => {
    navigate("/admin/new");
  };

  return (
    <div className="admin-container">
      <button className="new-btn" onClick={routeToPost}>+ New Post</button>

      {isLoading ? (
        <div className="loader-wrapper"><Loader /></div>
      ) : (
        <ul className="post-list">
          {data?.map((p) => (
            <li key={p.id} className="post-item">
              <span>{p.title}</span>
              <div className="btn-group">
                <button className="edit-btn" onClick={() => navigate(`/admin/edit/${p.id}`)}>Edit</button>
                <button className="delete-btn" >Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Adminportal;
