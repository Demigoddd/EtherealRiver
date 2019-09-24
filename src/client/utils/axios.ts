import axios from "axios";

const url = (process.env.NODE_ENV === 'production') ? window.location.origin : 'http://localhost:3003';

axios.defaults.baseURL = url;

axios.defaults.headers.common["token"] = window.localStorage.token;

(window as any).axios = axios;

export default axios;
