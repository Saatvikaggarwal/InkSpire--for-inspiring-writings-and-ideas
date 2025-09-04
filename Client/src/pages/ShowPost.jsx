import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchPost } from '../api/post';
import './ShowPost.css'; //  import CSS

const ShowPost = () => {
    const { id } = useParams();

    const [form, setForm] = useState({
        title: '',
        content: '',
        image: ''
    });

    useEffect(() => {
        (async function fetch() {
            const { data } = await fetchPost(id);

            setForm({
                title: data.title,
                content: data.content,
                image: data.imageUrl
            });
        })(); // self invoke
    }, [id]);

    return (
        <div className="post-container">
            <div className="post-card">
                <h2 className="post-title">{form.title}</h2>
                <hr />
                <p className="post-content">{form.content}</p>
                {form.image && (
                    <div className="post-image-wrapper">
                        <img
                            className="post-image"
                            src={form.image}
                            alt={form.title || "Post image"}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShowPost;
