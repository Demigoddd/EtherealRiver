import axios from "../axios";

export default {
  getAllByRoomId: (id: any) => axios.get("/messages?room=" + id),
  removeById: (id: any, deleteForAll: boolean) => axios.delete(`/messages/${id}/${deleteForAll}`),
  send: (postData: any) => axios.post("/messages", postData),
  updateMessage: (postData: any) => axios.post("/messages/updateMessage", postData),
  updateEmotion: (postData: any) => axios.post("/messages/updateEmotion", postData)
};
