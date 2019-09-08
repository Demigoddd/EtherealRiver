import socket from 'socket.io';
import http from 'http';

import { UserCtrl, RoomCtrl } from "../controllers";

export default (http: http.Server) => {
  const io = socket(http);
  const UserController = new UserCtrl(io);
  const RoomController = new RoomCtrl(io);
  const rooms = io.of('/rooms');
  const messages = io.of('/messages');

  rooms.on('connection', (socket: socket.Socket) => {

    socket.on('Create', (values: any) => {

      RoomController.create(values)
        .then((newRoom: any) => {
          socket.emit('UpdateRoomsList', { status: 'success', message: 'Room Created' });
          socket.broadcast.emit('UpdateRoomsList', { status: 'success', message: 'Room Created' });
        })
        .catch((error: any) => {
          socket.emit('UpdateRoomsList', { status: 'error', message: error });
        });
    });

    socket.on('GetCurrentRoom', (roomName: any, userId: number) => {
      RoomController.findRoom(roomName, (err: any, room: any) => {
        if (err || !room) {
          socket.emit('SetCurrentRoom', { status: 'error', message: err });
          throw err;
        }

        socket.emit('SetCurrentRoom', { status: 'success', room });
      });
    });

    socket.on('Join', (roomId: number, userId: number) => {
      RoomController.findById(roomId, (err: any, room: any) => {
        if (err || !room) {
          socket.emit('JoinHandle', { status: 'error', error: err });
          throw err;
        }

        RoomController.addUser(room, userId, (err: any, newRoom: any) => {
          if (err || !newRoom) {
            socket.emit('JoinHandle', { status: 'error', error: err });
            throw err;
          }

          socket.join(newRoom.id);

          socket.emit('JoinHandle', { status: 'success', room: newRoom });
          socket.emit('UpdateRoomsList', { status: 'success', message: 'Joined Room' });
        });
      });
    });

  });

  messages.on('connection', (socket: socket.Socket) => {

  });

  io.on('disconnect', () => {
    console.log("Disconnect");
  });

  return io;
};
