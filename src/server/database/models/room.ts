import { roomModel } from '../../database';
import * as User from '../models/user';

const create = (data: any, callback: any) => {
  const newRoom = new roomModel(data);
  newRoom.save(callback);
};

const find = (data: any, callback: any) => {
  roomModel.find(data, callback);
}

const findOne = (data: any, callback: any) => {
  roomModel.findOne(data, callback);
}

const findById = (id: number, callback: any) => {
  roomModel.findById(id, callback);
}

const findByIdAndUpdate = (id: number, data: any, callback: any) => {
  roomModel.findByIdAndUpdate(id, data, { new: true }, callback);
}

const addUser = (room: any, socket: any, callback: any) => {
  const userId = socket.request.session.passport.user;

  const conn = { userId: userId, socketId: socket.id };
  room.connections.push(conn);
  room.save(callback);
}

const getUsers = (room: any, socket: any, callback: any) => {
  const users: any[] = [];
  const vis: any = {};
  let cunt: number = 0;
  const userId: number = socket.request.session.passport.user;

  room.connections.forEach((conn: any) => {
    if (conn.userId === userId) {
      cunt++;
    }

    if (!vis[conn.userId]) {
      users.push(conn.userId);
    }
    vis[conn.userId] = true;
  });

  let loadedUsers = 0;
  users.forEach((userId, i) => {
    User.findById(userId, (err: any, user: any) => {
      if (err) { return callback(err); }
      users[i] = user;

      if (++loadedUsers === users.length) {
        return callback(null, users, cunt);
      }
    });
  });
}

const removeUser = (socket: any, callback: any) => {
  const userId: number = socket.request.session.passport.user;

  find(null, (err: any, rooms: any) => {
    if (err) { return callback(err); }

    rooms.every((room: any) => {
      let pass = true, cunt = 0, target = 0;

      room.connections.forEach((conn: any, i: any) => {
        if (conn.userId === userId) {
          cunt++;
        }
        if (conn.socketId === socket.id) {
          pass = false, target = i;
        }
      });

      if (!pass) {
        room.connections.id(room.connections[target]._id).remove();
        room.save((err: any) => {
          callback(err, room, userId, cunt);
        });
      }

      return pass;
    });
  });
}

export {
  create,
  find,
  findOne,
  findById,
  findByIdAndUpdate,
  addUser,
  getUsers,
  removeUser
};
