import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreatePostMutation } from '../services/api';
import './NewPost.css'; 

const NewPost = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: '',
        content: '',
    });

    const [createPost] = useCreatePostMutation();

    const handleChange = ({ target }) => {
        setForm((prevData) => ({
            ...prevData,
            [target.name]: target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPost({ title: form.title, content: form.content });
            navigate('/admin');
        } catch (err) {
            console.error("Post creation failed", err);
        }
    };

    return (
        <div className="post-form-container">
            <form onSubmit={handleSubmit} className="post-form">
                <h2 className="form-heading">Create New Post</h2>

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

                <button type="submit" className="submit-btn">Add Post</button>
            </form>
        </div>
    );
};

export default NewPost;
