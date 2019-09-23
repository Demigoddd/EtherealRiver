import axios from "axios";
// const publicUrl = process.env.PUBLIC_URL || 'http://localhost:3003';
axios.defaults.baseURL = window.location.origin;
// axios.defaults.baseURL = publicUrl;
axios.defaults.headers.common["token"] = window.localStorage.token;

(window as any).axios = axios;

export default axios;
