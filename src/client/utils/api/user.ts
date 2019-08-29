import axios from "../axios";

export default {
  googleAuth: () => axios.post("/user/google"),
  login: (postData: any) => axios.post("/user/login", postData),
  register: (postData: any) => axios.post("/user/register", postData),
  sendVerifyEmail: (email: any) => axios.post("/user/sendVerifyEmail", email),
  verifyHash: (hash: any) => axios.get("/user/verify?hash=" + hash),
  getMe: () => axios.get("/user/me"),
  show: (id: any) => axios.get(`/user/${id}`),
  findUsers: (query: any) => axios.get("/user/findUsers?query=" + query)
};
