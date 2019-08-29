import axios from "../axios";

export default {
  index: (id: any) => axios.get(`/room/${id}`),
  findRooms: (query: any) => axios.get("/room/find?query=" + query),
  create: (postData: any) => axios.post(`/room/create`, postData),
  delete: (id: any) => axios.delete(`/room/${id}`),
};
