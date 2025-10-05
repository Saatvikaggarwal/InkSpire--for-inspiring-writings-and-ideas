import axios from "axios"

const API_URL = import.meta.env.VITE_API_BASE_URL+"/api/auth";  //baseurl 

// const api = axios.create({   // Sets the base URL for all requests
//     baseURL:API_URL,
//     withCredentials:true
// })

export const signup=({username,email,password})=>{
    return axios.post(
        `${API_URL}/signup`,
        { username, email, password },
        {withCredentials:true}  //cookies
    )
}

export const login = ({ email, password }) => {
    return axios.post(
        `${API_URL}/login`,
        { email, password },
        { withCredentials: true }  //cookies
    )
}
