import socket from 'socket.io';
import http from 'http';

import { UserCtrl, RoomCtrl } from "../controllers";

export default (http: http.Server) => {
  const io: any = socket(http);
  const UserController = new UserCtrl(io);
  const RoomController = new RoomCtrl(io);

  io.on('connection', (socket: socket.Socket) => {

    socket.on('JoinRoom', (currentRoomId: any, userId: any) => {
      // Join user to room
      socket.join(currentRoomId);

      // Update socketId for user
      UserController.updateSocketId(userId, socket.id);
    });

    socket.on('LeaveRoom', (roomId: any, socketId: any, adminId: any, updateRooms: boolean) => {
      if (adminId) {
        // Find specific User.
        const leaveSocket = io.of("/").connected[socketId];

        if (leaveSocket) {
          // Leave specific User from current room
          leaveSocket.leave(roomId);

          // Updated rooms list for user
          leaveSocket.emit('UpdateRoomsList', { status: 'success', message: 'Update Room List' });

          // Updated current room for user
          leaveSocket.emit('UpdateCurrentRoom', { status: 'success', room: {} });
        }
      } else {
        // Leave user to room
        socket.leave(roomId);

        // Update Rooms List and Current Room if needed.
        if (updateRooms) {
          // Update Rooms List for All Users
          socket.emit('UpdateRoomsList', { status: 'success', message: 'Update Room List' });

          // Updated current room for user
          socket.emit('UpdateCurrentRoom', { status: 'success', room: {} });
        }
      }
    });

  });

  io.on('disconnect', () => {
    console.log("Disconnect");
  });

  return io;
};

