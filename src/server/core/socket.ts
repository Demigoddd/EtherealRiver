import socket from 'socket.io';
import http from 'http';

import { RoomModel } from '../models';

export default (http: http.Server) => {
  const io = socket(http);

  const rooms = io.of('/rooms');
  const messages = io.of('/messages');

  rooms.on('connection', (socket: socket.Socket) => {

    socket.on('ROOMS:Create', (values: any) => {
      console.log("RoomData", values);

      RoomModel.create(values)
        .then((newRoom: any) => {
          socket.emit('ROOMS:UpdateRoomsList', {status: 'success', message: 'Room Created', data: newRoom});
          socket.broadcast.emit('updateRoomsList', {status: 'success', message: 'Room Created', data: newRoom});
        })
        .catch((error: any) => {
          socket.emit('ROOMS:UpdateRoomsList', {status: 'error', message: error});
        });
    });

  });

  messages.on('connection', (socket: socket.Socket) => {

    socket.on('MESSAGES:JOIN', (roomId: number) => {
      console.log("Room ID", roomId);
    });

  });

  io.on('disconnect', () => {
    console.log("Disconnect");
  });

  return io;
};
