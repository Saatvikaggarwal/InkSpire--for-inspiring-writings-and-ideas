import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useDeletePostMutation, useFetchPostsByUserIdQuery, useFetchPostsQuery, useFetchUserQuery } from '../services/api';
import Loader from '../components/Loader';
import './Adminportal.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


const Adminportal = () => {
  const navigate = useNavigate();
  
  
  const { data: userResponse, isLoading: isUserLoading, isError: isUserError } = useFetchUserQuery();
  const username = userResponse.user.username;

  const { data, isLoading, isError } = useFetchPostsByUserIdQuery();


  //for counting likes
  const [likeCounts, setLikeCounts] = useState({});


  useEffect(() => {
    if (data) {
      data.forEach((p) => {
        countLikes(p.id);
      });
    }
  }, [data]);

  async function countLikes(postId) {
    try {
      const res = await axios.get(import.meta.env.VITE_API_BASE_URL +`/api/like/${postId}`, {
        withCredentials: true,
      });
      setLikeCounts((prev) => ({
        ...prev,
        [postId]: res.data.likes,   // store likes for that post
      }));
    } catch (err) {
      console.log("cannot fetch likes", err);
    }
  }


  const routeToPost = () => {
    navigate("/admin/new");
  };

  const [delPost]=useDeletePostMutation();
  async function deletePost(id){
    try{
      await delPost(id);
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className="admin-container">
      {/* <h4 className='post-author'>{username}</h4> */}
      <button className="new-btn" onClick={routeToPost}>+ New Post</button>
      
      {isLoading ? (
        <div className="loader-wrapper"><Loader /></div>
      ) : (
        <ul className="post-list">
          {data?.map((p) => (
            <li key={p.id} className="post-item">
              <div className='post-content'>
                <span className="post-title">{p.title}</span>
                {/* <span className="post-author">{p.author.username}</span> */}
                <span> likes {likeCounts[p.id] || 0}</span>
              </div>
              <div className="btn-group">
                <button className="edit-btn" onClick={() => navigate(`/admin/edit/${p.id}`)}>Edit</button>
                <button className="delete-btn" onClick={()=>deletePost(p.id)} >Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Adminportal;
