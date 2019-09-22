import axios from "../axios";

export default {
  getAll: () => axios.get("/room/getAll"),
  index: (id: any) => axios.get(`/room/${id}`),
  create: (postData: any) => axios.post("/room", postData),
  updateRoom: (postData: any) => axios.post("/room/updateRoom", postData),
  addUser: (postData: any) => axios.post("/room/addUser", postData),
  removeUser: (postData: any) => axios.post("/room/removeUser", postData),
  delete: (id: any) => axios.delete(`/room/${id}`),
};
