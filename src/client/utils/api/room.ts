import axios from "../axios";

export default {
  index: (id: any) => axios.get(`/room/${id}`),
  getAll: () => axios.get("/room/getAll"),
  delete: (id: any) => axios.delete(`/room/${id}`),
};
