import axios from 'axios'
const AUTH_TOKEN = localStorage.getItem('token')

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

if (AUTH_TOKEN) {
    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;    
}

export default axios