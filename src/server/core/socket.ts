import socket from "socket.io";
import http from "http";

import { RoomModel } from "../models";

export default (http: http.Server) => {
  const io = socket(http);

  const rooms = io.of('/rooms');
  const messages = io.of('/messages');

  rooms.on('connection', (socket: socket.Socket) => {

    socket.on('createRoom', (values: any) => {
      RoomModel.create
    });

  });


  return io;
};
