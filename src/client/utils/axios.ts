import axios from "axios";

axios.defaults.baseURL = window.location.origin;
// axios.defaults.baseURL = 'http://localhost:3003';
axios.defaults.headers.common["accessToken"] = window.localStorage.accessToken;

(window as any).axios = axios;

export default axios;
