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

        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("content", form.content);
        if (imgFile) {
            formData.append("img", imgFile); // "image" should match multer field name
        }

        try {
            await createPost(formData);
            navigate('/admin');
        } catch (err) {
            console.error("Post creation failed", err);
        }
    };
    const [imgFile, setImgFile] = useState();
    const [imgData,setImage]=useState();

    function handleFile(e) {
        setImgFile(e.target.files[0]);
        const reader = new FileReader();
        // console.log(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);

        reader.onloadend = () => {
            console.log("DONE");
            setImage(reader.result);
        }
    }

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
                <div className="image-upload">
                    <input type="file" onChange={handleFile} />
                    {imgData && (
                        <img
                            src={imgData}
                            alt="Uploaded preview"
                            className="image-preview"
                        />
                    )}
                </div>
                
                <button type="submit" className="submit-btn">Add Post</button>
            </form>
        </div>
    );
};

export default NewPost;
