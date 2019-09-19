import axios from "../axios";

export default {
  getAllByRoomId: (id: any) => axios.get("/messages?room=" + id),
  removeById: (id: any) => axios.delete("/messages?id=" + id),
  send: (text: string, roomId: any) => axios.post("/messages", { text, roomId })
};
