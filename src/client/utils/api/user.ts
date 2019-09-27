import axios from "../axios";

export default {
  login: (postData: any) => axios.post("/user/login", postData),
  socialLogin: (postData: any) => axios.post("/user/socialLogin", postData),
  register: (postData: any) => axios.post("/user/register", postData),
  socialRegister: (postData: any) => axios.post("/user/socialRegister", postData),
  sendVerifyEmail: (postData: any) => axios.post("/user/sendVerifyEmail", postData),
  verifyHash: (hash: any) => axios.get("/user/verify?hash=" + hash),
  getMe: () => axios.get("/user/me"),
  show: (id: any) => axios.get(`/user/${id}`),
  findUsers: (query: any) => axios.get("/user/find?query=" + query)
};
