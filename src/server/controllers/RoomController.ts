import socket from "socket.io";

import { RoomModel } from "../models";
import { UserModel } from "../models";

class RoomController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  /**
   * REQUEST METHODS
   */
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

  getAll = (req: any, res: any) => {
    RoomModel.find({})
      .then((rooms: any) => {
        const myRoom = rooms.filter((room: any) => this.userExistInRoom(room.users, req.user._id));
        const publicRoom = rooms.filter((room: any) => room.type === 'public' && !this.userExistInRoom(room.users, req.user._id));
        const privateRoom = rooms.filter((room: any) => room.type === 'private' && !this.userExistInRoom(room.users, req.user._id));

        const allRoomsData = {
          my: myRoom,
          public: publicRoom,
          private: privateRoom
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

  /**
   * PUBLIC METHODS
   */
  userIsRoomAdmin = (authors: any, userId: any) => {
    return (authors || []).includes(userId);
  };

  userExistInRoom = (users: any, userId: any) => {
    return (users || []).some((user: any) => user._id === userId)
  };

  addUser = (room: any, userId: number, socketId: any, callback: any) => {
    const isUserExist = this.userExistInRoom(room.users, userId);

    if (isUserExist) {
      return callback();
    } else {
      UserModel.findById(userId, (err: any, user: any) => {
        if (err || !user) {
          return callback(err);
        }

        const newUser = {
          _id: user._id,
          socketId: socketId,
          email: user.email,
          fullname: user.fullname,
          avatar: user.avatar,
          isOnline: user.isOnline,
        };

        room.users.push(newUser);
        room.save(callback);
      });
    }
  };

  removeUser = (room: any, userId: number, callback: any) => {
    const isUserExist = this.userExistInRoom(room.users, userId);

    if (isUserExist) {
      const updatedUsers = room.users.filter((user: any) => user._id !== userId);

      Object.assign(room, { users: updatedUsers });

      room.save(callback);
    } else {
      return callback();
    }
  };

  findRoom = (roomName: string, callback: any) => {
    RoomModel.findOne({ name: roomName }, callback);
  };

  findById = (id: any, callback: any) => {
    RoomModel.findById(id, callback);
  };

  updateRoomPropert = (room: any, property: any, data: any, callback: any) => {
    Object.assign(room, { [property]: data });

    room.save(callback);
  };

  create = (values: any) => {
    let postData = {};

    if (values.roomType === "public") {
      postData = {
        name: values.roomName,
        type: values.roomType,
        authors: [values.userId]
      };

      return new RoomModel(postData).save();
    } else if (values.roomType === "private") {
      postData = {
        name: values.roomName,
        type: values.roomType,
        password: values.password,
        authors: [values.userId],
      };

      return new RoomModel(postData).save();
    } else {
      throw new Error("Room when creating Room");
    }
  };
}

export default RoomController;
