import axios from "axios";

const BASE_URL = import.meta.env.VITE_SUPABASE_URL
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const api = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    apikey: ANON_KEY,
    // Authorization: `Bearer ${ANON_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')

    if (token){
      config.headers.Authorization = `Bearer ${token}`
    } else {
      config.headers.Authorization = `Bearer ${ANON_KEY}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api;
