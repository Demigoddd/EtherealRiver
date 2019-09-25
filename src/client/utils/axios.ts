import axios from "axios";
// @ts-ignore
import window from "global";

const url = (process.env.NODE_ENV === 'production') ? window.location.origin : 'http://localhost:3003';

axios.defaults.baseURL = url;

axios.defaults.headers.common["token"] = localStorage.getItem("token");

(window as any).axios = axios;

export default axios;
