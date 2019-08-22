import axios from "axios";

export default {
  login: (postData: any) => axios.post("/user/login", postData),
  register: (postData: any) => axios.post("/user/register", postData),
  verifyHash: (hash: any) => axios.get("/user/verify?hash=" + hash),
  findById: () => axios.get("/user/findById"),
  findUsers: (query: any) => axios.get("/user/findUsers?query=" + query)
};
