import axios from "axios";

const api=axios.create({
    baseURL: "http://localhost:4444/api/post",
    withCredentials:true,
})


// export const newPost=({title,content})=>{
//     return axios.post(
//         `${BASE_URL}/`,
//         { title,content },
//         { withCredentials: true }  //cookies

//     )
// }

// export const fetchPosts=()=>api.get('/');
export const fetchPost=(id)=>api.get(`/${id}`);
// export const fetchPostByUserID=()=>api.get("/user");
// export const createPost=({title,content})=>api.post('/',{title,content});
// export const updatePost = (id,title,content) => api.put(`/${id}`, {title,content});
export const deletePost = (id) => api.delete(`/${id}`);
