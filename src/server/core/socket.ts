import socket from 'socket.io';
import http from 'http';

import { UserCtrl, RoomCtrl } from "../controllers";

export default (http: http.Server) => {
  const io: any = socket(http);
  const UserController = new UserCtrl(io);
  const RoomController = new RoomCtrl(io);
  const rooms: any = io.of('/rooms');
  const messages: any = io.of('/messages');

  rooms.on('connection', (socket: socket.Socket) => {

    socket.on('Create', (values: any) => {
      RoomController.create(values)
        .then((createdRoom: any) => {
          RoomController.addUser(createdRoom, values.userId, socket.id, (error: any, updatedRoom: any) => {
            if (error || !updatedRoom) {
              socket.emit('JoinHandle', { status: 'error', message: error });
            } else {
              // Join user to room
              socket.join(updatedRoom._id);

              // Send current room to user
              socket.emit('JoinHandle', { status: 'success', room: updatedRoom });

              // Update Rooms List for All Users
              socket.emit('UpdateRoomsList', { status: 'success', message: 'Room Created' });
              socket.broadcast.emit('UpdateRoomsList', { status: 'success', message: 'Room Created' });
            }
          });
        })
        .catch((error: any) => {
          socket.emit('UpdateRoomsList', { status: 'error', message: error });
        });
    });

    socket.on('Update', (roomId: any, property: any, roomName: any) => {
      RoomController.findById(roomId, (error: any, findedRoom: any) => {
        if (error || !findedRoom) {
          socket.emit('JoinHandle', { status: 'error', message: error });
        } else {
          RoomController.updateRoomPropert(findedRoom, property, roomName, (error: any, updatedRoom: any) => {
            if (error || !updatedRoom) {
              socket.emit('JoinHandle', { status: 'error', message: error });
            } else {
              // Update current room for Room Users
              rooms.to(updatedRoom._id).emit('JoinHandle', { status: 'success', room: updatedRoom });

              // Update Rooms List for All Users
              socket.emit('UpdateRoomsList', { status: 'success', message: 'Room Updated' });
              socket.broadcast.emit('UpdateRoomsList', { status: 'success', message: 'Room Updated' });
            }
          });
        }
      });
    });

    socket.on('Destroy', (roomId: any) => {
      RoomController.findById(roomId, (error: any, findedRoom: any) => {
        if (error || !findedRoom) {
          socket.emit('JoinHandle', { status: 'error', message: error });
        } else {
          // Remove room from db
          findedRoom.remove();

          // Send empty room to all users from current room
          rooms.to(findedRoom._id).emit('JoinHandle', { status: 'success', room: {} });

          // Update Rooms List for All Users
          socket.emit('UpdateRoomsList', { status: 'success', message: 'Room Deleted' });
          socket.broadcast.emit('UpdateRoomsList', { status: 'success', message: 'Room Deleted' });

          // Leave all sockets from current room
          rooms.in(findedRoom._id).clients((error: any, clients: any) => {
            if (error) throw error;
            for (let i = 0; i < clients.length; i++) {
              let clientId = clients[i];
              // load the socket of your namespace
              let socket = rooms.in(findedRoom._id).connected[clientId]
              socket.leave(findedRoom._id);
            }
          });
        }
      });
    });

    socket.on('Join', (roomName: any, roomId: any, userId: any) => {
      if (roomName) {
        RoomController.findRoom(roomName, (error: any, findedRoom: any) => {
          if (error || !findedRoom) {
            socket.emit('JoinHandle', { status: 'error', message: error });
          } else {
            if (RoomController.userExistInRoom(findedRoom.users, userId)) {
              socket.emit('JoinHandle', { status: 'success', room: findedRoom });
            } else {
              // if user not exist in room, Hilde all Users from Room.
              const roomWithoutUsers = Object.assign(findedRoom, { users: [] });

              // Send room to user
              socket.emit('JoinHandle', { status: 'success', room: roomWithoutUsers });
            }
          }
        });
      } else if (roomId && userId) {
        RoomController.findById(roomId, (error: any, findedRoom: any) => {
          if (error || !findedRoom) {
            socket.emit('JoinHandle', { status: 'error', error: error });
          } else {
            RoomController.addUser(findedRoom, userId, socket.id, (error: any, updatedRoom: any) => {
              if (error || !updatedRoom) {
                socket.emit('JoinHandle', { status: 'error', error: error });
              } else {
                // Join user to room
                socket.join(updatedRoom._id);

                // Update User List for other users in current room
                rooms.to(updatedRoom._id).emit('JoinHandle', { status: 'success', room: updatedRoom });

                // Update Rooms List for user
                socket.emit('UpdateRoomsList', { status: 'success', message: 'Room Updated' });
              }
            });
          }
        });
      } else {
        socket.emit('JoinHandle', { status: 'error', error: { message: "Error when joined the room" } });
      }
    });

    socket.on('Leave', (roomId: any, userId: any) => {
      RoomController.findById(roomId, (error: any, findedRoom: any) => {
        if (error || !findedRoom) {
          socket.emit('JoinHandle', { status: 'error', error: error });
        } else {
          RoomController.removeUser(findedRoom, userId, (error: any, updatedRoom: any) => {
            if (error || !updatedRoom) {
              socket.emit('JoinHandle', { status: 'error', error: error });
            } else {
              if (RoomController.userIsRoomAdmin(updatedRoom.authors, userId)) {
                // Find specific User.
                let socketId = updatedRoom.users.find((user: any) => user._id === userId).socketId;
                let leaveSocket = rooms.connected[socketId];

                // Leave specific User from current room
                leaveSocket.leave(updatedRoom._id);

                // Hilde all Users from Room.
                const roomWithoutUsers = Object.assign(updatedRoom, { users: [] });

                // Emit specific User.
                leaveSocket.emit('JoinHandle', { status: 'success', room: roomWithoutUsers });

                // Updated rooms list for user
                leaveSocket.emit('UpdateRoomsList', { status: 'success', message: 'Leaved the Room' });

                // Updated current room for All users in room
                rooms.to(updatedRoom._id).emit('JoinHandle', { status: 'success', room: updatedRoom });
              } else {
                // Leave user from room
                socket.leave(updatedRoom._id);

                // if user leave the Room, Hilde all Users from Room.
                const roomWithoutUsers = Object.assign(updatedRoom, { users: [] });

                // Updated current room for user
                socket.emit('JoinHandle', { status: 'success', room: roomWithoutUsers });

                // Updated rooms list for user
                socket.emit('UpdateRoomsList', { status: 'success', message: 'User Leaved the Room' });

                // Updated current room for All users in room
                rooms.to(updatedRoom._id).emit('JoinHandle', { status: 'success', room: updatedRoom });
              }
            }
          });
        }
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

