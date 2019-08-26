import axios from "axios";

axios.defaults.baseURL = window.location.origin;
axios.defaults.headers.common["token"] = window.localStorage.accessToken;;

(window as any).axios = axios;

export default axios;
