import axios from "../axios";

export default {
  index: (id: any) => axios.get(`/room/${id}`),
  getAll: () => axios.get("/room/getAll"),
  create: (postData: any) => axios.post(`/room/create`, postData),
  delete: (id: any) => axios.delete(`/room/${id}`),
};
