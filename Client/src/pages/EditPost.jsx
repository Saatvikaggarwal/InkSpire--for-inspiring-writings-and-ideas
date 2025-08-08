import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditPostMutation } from '../services/api';
import { fetchPost } from '../api/post';
import './EditPost.css';
import Loader from '../components/Loader';

const EditPost = () => {
    const navigate = useNavigate();
    const {id}=useParams();

    const [loading,setLoading]=useState(true);
    const [form, setForm] = useState({
        title: '',
        content: '',
    });
    useEffect(()=>{
        
        (async function fetch(){
            const {data}=await fetchPost(id);

            setForm((prev)=>({
                title:data.title,
                content:data.content,
            }));

            setLoading(false);
        })();  //self invoke
        
    },[])

    const [editPost] = useEditPostMutation();

    const handleChange = ({ target }) => {
        setForm((prevData) => ({
            ...prevData,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await editPost({id, title: form.title, content: form.content }); //backend pr request jaaye iske liye id bhi bhejni pdegi backend pr aur wo humne useParams() se nikali
            navigate('/admin');
        } catch (err) {
            console.error("Post creation failed", err);
        }
    };

    return (
        <>
         {loading?<Loader/>:
                <div className="post-form-container">
                    <form onSubmit={handleSubmit} className="post-form">
                        <h2 className="form-heading">Update Post</h2>

                        <label>Title</label>
                        <input
                            onChange={handleChange}
                            name="title"
                            type="text"
                            value={form.title}
                            placeholder="Enter title"
                            className="input-field"
                        />

                        <label>Content</label>
                        <textarea
                            onChange={handleChange}
                            name="content"
                            value={form.content}
                            placeholder="Write content here..."
                            className="textarea-field"
                            rows="5"
                        />

                        <button type="submit" className="submit-btn">Update Post</button>
                    </form>
                </div>}   
        </>
    );
};

export default EditPost;
