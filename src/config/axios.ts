import axios from 'axios'

const api = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    headers: {'Content-Type':'application/json'}
})


api.interceptors.request.use(config => {
    const user = localStorage.getItem('knowledge__user');
    if (user) {
        const obj = JSON.parse(user);
        if (obj && obj.token) {
            config.headers.Authorization = `Bearer ${obj.token}`;
        }
    }
    return config;
});



export default api