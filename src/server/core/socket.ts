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
        .then((room: any) => {
          RoomController.addUser(room, values.userId, (error: any, newRoom: any) => {
            if (error || !newRoom) {
              socket.emit('JoinHandle', { status: 'error', message: error });
              throw error;
            }

            socket.join(newRoom.id);

            socket.emit('JoinHandle', { status: 'success', room: newRoom });
            socket.emit('UpdateRoomsList', { status: 'success', message: 'Room Created' });
            socket.broadcast.emit('UpdateRoomsList', { status: 'success', message: 'Room Created' });
          });
        })
        .catch((error: any) => {
          socket.emit('UpdateRoomsList', { status: 'error', message: error });
        });
    });

    socket.on('Join', (roomName: any, roomId: any, userId: any) => {
      if (roomName) {
        RoomController.findRoom(roomName, (error: any, room: any) => {
          if (error || !room) {
            socket.emit('JoinHandle', { status: 'error', message: error });
            throw error;
          }

          if (RoomController.userExistInRoom(room.users, userId)) {
            socket.emit('JoinHandle', { status: 'success', room });
          } else {
            // if user not exist in room, Hilde all Users from Room.
            const newRoom = Object.assign(room, {users: []});
            socket.emit('JoinHandle', { status: 'success', room: newRoom });
          }
        });
      } else if (roomId && userId) {
        RoomController.findById(roomId, (error: any, room: any) => {
          if (error || !room) {
            socket.emit('JoinHandle', { status: 'error', error: error });
            throw error;
          }

          RoomController.addUser(room, userId, (error: any, newRoom: any) => {
            if (error || !newRoom) {
              socket.emit('JoinHandle', { status: 'error', error: error });
              throw error;
            }

            socket.join(newRoom.id);

            socket.emit('JoinHandle', { status: 'success', room: newRoom });
            socket.emit('UpdateRoomsList', { status: 'success', message: 'Room Updated' });
          });
        });
      } else {
        socket.emit('JoinHandle', { status: 'error', error: { message: "Error when joined the room"} });
      }
    });

    socket.on('Leave', (roomId: any, userId: any) => {
      RoomController.findById(roomId, (error: any, room: any) => {
        if (error || !room) {
          socket.emit('JoinHandle', { status: 'error', error: error });
          throw error;
        }

        RoomController.removeUser(room, userId, (error: any, newRoom: any) => {
          if (error || !newRoom) {
            socket.emit('JoinHandle', { status: 'error', error: error });
            throw error;
          }

          socket.leave(room.id);

          socket.emit('JoinHandle', { status: 'success', room: newRoom });
          socket.emit('UpdateRoomsList', { status: 'success', message: 'User Leaved the Room' });
          socket.broadcast.emit('UpdateRoomsList', { status: 'success', message: 'Room Updated' });
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
