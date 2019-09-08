import socket from "socket.io";

import { RoomModel } from "../models";
import { UserModel } from "../models";

class RoomController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  index = (req: any, res: any) => {
    const id: string = req.params.id;

    RoomModel.findById(id, (err: any, room: any) => {
      if (err) {
        return res.status(404).json({
          message: "Room not found"
        });
      }
      res.json(room);
    });
  };

  addUser = (room: any, userId: number, callback: any) => {
    const isUserExist = room.users.some((u: any) => u._id === userId);

    if (isUserExist) return callback;

    UserModel.findById(userId, (err: any, user: any) => {
      if (err || !user) {
        return callback(err);
      }

      const newUser = {
        _id: user._id,
        email: user.email,
        fullname: user.fullname,
        avatar: user.avatar,
        isOnline: user.isOnline,
      };

      room.users.push(newUser);
      room.save(callback);
    });
  };

  findRoom = (roomName: string, callback: any) => {
    RoomModel.findOne({ name: roomName }, callback);
  };

  findById = (id: any, callback: any) => {
    RoomModel.findById(id, callback);
  };

  getUsers = (users: any, userId: number, callback: any) => {
    let loadedUsers: number = 0;
    const isUserNotExist = !users.some((u: any) => u._id === userId);

    if (isUserNotExist) return callback(null, []);

    users.forEach((userId: number, i: any) => {
      UserModel.findById(userId, (err: any, user: any) => {
        if (err || !user) {
          return callback(err);
        }

        const newUser = {
          _id: user._id,
          email: user.email,
          fullname: user.fullname,
          avatar: user.avatar,
          isOnline: user.isOnline,
        };

        users[i] = newUser;

        if (++loadedUsers === users.length) {
          return callback(null, users);
        }
      });
    });
  };

  getAll = (req: any, res: any) => {
    RoomModel.find({})
      .then((rooms: any) => {
        const myRoom = rooms.filter((r: any) => r.users.some((u: any) => u._id === req.user._id));
        const personalRoom = rooms.filter((r: any) => r.type === 'personal' && r.authors.includes(req.user._id));
        const publicRoom = rooms.filter((r: any) => r.type === 'public');
        const privateRoom = rooms.filter((r: any) => r.type === 'private');

        const allRoomsData = {
          my: myRoom,
          public: publicRoom,
          private: privateRoom,
          personal: personalRoom
        };

        res.json(allRoomsData);
      })
      .catch((err: any) => {
        return res.status(404).json({
          status: "error",
          message: err
        });
      });
  };

  create = (values: any) => {
    let postData = {};

    if (values.roomType === "public") {
      postData = {
        name: values.roomName,
        type: values.roomType,
        authors: [values.userId]
      };
    } else if (values.roomType === "private") {
      postData = {
        name: values.roomName,
        type: values.roomType,
        password: values.password,
        authors: [values.userId],
      };
    } else if (values.roomType === "personal") {
      UserModel.findOne({ email: values.email }, (err: any, user: any) => {
        if (err || !user) {
          throw Error(err);
        }

        postData = {
          name: user.fullname,
          type: values.roomType,
          authors: [values.userId, user._id]
        };
      });
    }

    return new RoomModel(postData).save();
  };

  delete = (req: any, res: any) => {
    const id: string = req.params.id;

    RoomModel.findOneAndRemove({ _id: id })
      .then((rooms: any) => {
        if (rooms) {
          res.json({
            message: 'Room deleted'
          });
        }
      })
      .catch(() => {
        res.json({
          message: 'Room not found'
        });
      });
  };
}

export default RoomController;
