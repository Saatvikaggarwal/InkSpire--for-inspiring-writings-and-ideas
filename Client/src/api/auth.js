import axios from "axios"

// FIX: Set the base URL to ONLY the Vercel variable (no prefixes added here)
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const signup = ({ username, email, password }) => {
    return axios.post(
        `${API_BASE}/api/auth/signup`,
        { username, email, password },
        { withCredentials: true }
    )
}

export const login = ({ email, password }) => {
    return axios.post(
        `${API_BASE}/api/auth/login`,
        { email, password },
        { withCredentials: true }
    )
}
