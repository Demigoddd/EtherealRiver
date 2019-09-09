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
        const personalRoom = rooms.filter((room: any) => room.type === 'personal' && room.authors.includes(req.user._id));
        const publicRoom = rooms.filter((room: any) => room.type === 'public' && !this.userExistInRoom(room.users, req.user._id));
        const privateRoom = rooms.filter((room: any) => room.type === 'private' && !this.userExistInRoom(room.users, req.user._id));

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
  userExistInRoom = (users: any, userId: any) => {
    return users.some((u: any) => u._id === userId)
  };

  addUser = (room: any, userId: number, callback: any) => {
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

  findRoom = (roomName: string, callback: any) => {
    RoomModel.findOne({ name: roomName }, callback);
  };

  findById = (id: any, callback: any) => {
    RoomModel.findById(id, callback);
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

        return new RoomModel(postData).save();
      });
    }

    throw new Error("Room when creating Room");
  };
}

export default RoomController;
