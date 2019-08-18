import session from '../utils/session';
import * as Room from '../database/models/room';

const ioEvents = (io: any) => {
  io.of('/rooms').on('connection', (socket: any) => {

    socket.on('createRoom', (title: string) => {
      Room.findOne({ 'title': new RegExp('^' + title + '$', 'i') }, (err: any, room: any) => {
        if (err) throw err;

        if (room) {
          socket.emit('updateRoomsList', { error: 'Room title already exists.' });
        } else {
          Room.create({
            title: title
          }, (err: any, newRoom: any) => {
            if (err) throw err;

            socket.emit('updateRoomsList', newRoom);
            socket.broadcast.emit('updateRoomsList', newRoom);
          });
        }
      });
    });
  });

  io.of('/chatroom').on('connection', (socket: any) => {

    socket.on('join', (roomId: any) => {
      Room.findById(roomId, (err: any, room: any) => {
        if (err) throw err;

        if (!room) {
          socket.emit('updateUsersList', { error: 'Room doesnt exist.' });
        } else {
          // Check if user exists in the session
          if (socket.request.session.passport == null) {
            return;
          }

          Room.addUser(room, socket, (err: any, newRoom: any) => {
            socket.join(newRoom.id);

            Room.getUsers(newRoom, socket, (err: any, users: any, cuntUserInRoom: any) => {
              if (err) throw err;

              socket.emit('updateUsersList', users, true);

              if (cuntUserInRoom === 1) {
                socket.broadcast.to(newRoom.id).emit('updateUsersList', users[users.length - 1]);
              }
            });
          });
        }
      });
    });

    socket.on('disconnect', () => {
      if (socket.request.session.passport == null) {
        return;
      }

      Room.removeUser(socket, (err: any, room: any, userId: number, cuntUserInRoom: any) => {
        if (err) throw err;

        socket.leave(room.id);

        if (cuntUserInRoom === 1) {
          socket.broadcast.to(room.id).emit('removeUser', userId);
        }
      });
    });

    socket.on('newMessage', (roomId: number, message: string) => {
      socket.broadcast.to(roomId).emit('addMessage', message);
    });

  });
}

const initSocket = (io: any): any => {
  io.use((socket: any, next: any) => {
    session(socket.request, {}, next);
  });

  ioEvents(io);
}

export default initSocket;
