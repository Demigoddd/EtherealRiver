import socket from "socket.io";
import bcrypt from "bcrypt";

import { RoomModel } from "../models";
import { UserModel } from "../models";
import { MessageModel } from "../models";

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

    RoomModel.findById(id)
      .populate('users', 'email fullname avatar isOnline socketId last_seen')
      .exec((err: any, room: any) => {
        if (err || !room) {
          return res.status(404).json({
            message: "Room not found"
          });
        }

        const usersIds = room.users.map((user: any) => user._id);
        const userExist = this.userExistInRoom(usersIds, req.user._id);
        const roomObj = userExist ? room : Object.assign(room, { users: [] });

        res.json({ room: roomObj, userExistInRoom: userExist });
      });
  };

  updateRoom = (req: any, res: any) => {
    const { roomId, property, data } = req.body;

    RoomModel.findById(roomId, (err: any, room: any) => {
      if (err || !room) {
        return res.status(404).json({
          message: "Room not found"
        });
      }

      Object.assign(room, { [property]: data });

      room.save()
        .then((room: any) => {
          RoomModel.findById(room._id)
            .populate('users', 'email fullname avatar isOnline socketId last_seen')
            .exec((err: any, room: any) => {
              if (err || !room) {
                return res.status(404).json({
                  message: "Room not found"
                });
              }

              // Update current room for Room Users
              this.io.in(room._id).emit('UpdateCurrentRoom', { status: 'success', room: room });

              // Update Rooms List for All Users
              this.io.emit('UpdateRoomsList', { status: 'success', message: 'Room List Updated' });

              res.json(room);
            });
        })
        .catch((error: any) => {
          res.status(500).json({
            message: 'Room not updated',
            error
          });
        });
    });
  };

  create = (req: any, res: any) => {
    let postData = {};

    if (req.body.roomType === "public") {
      postData = {
        name: req.body.roomName,
        type: req.body.roomType,
        users: [req.body.userId],
        authors: [req.body.userId]
      };
    } else if (req.body.roomType === "private") {
      postData = {
        name: req.body.roomName,
        type: req.body.roomType,
        password: bcrypt.hashSync(req.body.password, 10),
        users: [req.body.userId],
        authors: [req.body.userId]
      };
    }

    RoomModel.findOne({ name: req.body.roomName }, (error: any, findedRoom: any) => {
      if (error || findedRoom) {
        return res.status(500).json({
          message: "Room Already exist"
        });
      } else {

        new RoomModel(postData).save((error: any, obj: any) => {
          if (error || !obj) {
            res.status(500).json({
              message: 'Room not created',
              error
            });
          }

          obj.populate(['users', 'email fullname avatar isOnline socketId last_seen'], (error: any, room: any) => {
            if (error) {
              return res.status(500).json({
                status: "error",
                message: error
              });
            }

            // Update Rooms List for All Users
            this.io.emit('UpdateRoomsList', { status: 'success', message: 'Update Room List' });

            res.json(room);
          });
        });
      }
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
    RoomModel.findById(req.params.id, (error: any, room: any) => {
      if (error || !room) {
        return res.status(404).json({
          message: "Room not found"
        });
      }

      // Remove all Messages from Room
      MessageModel.find({ room: room._id }).remove().exec();

      // Remove room from db
      room.remove();

      // Send empty room to all users from current room
      this.io.in(room._id).emit('UpdateCurrentRoom', { status: 'success', room: {} });

      // Update Rooms List for All Users
      this.io.emit('UpdateRoomsList', { status: 'success', message: 'Update Room List' });

      res.json(room);
    });
  };

  addUser = (req: any, res: any) => {
    const roomId = req.body.currentRoomId;
    const userId = req.user._id;
    const password = req.body.password;

    RoomModel.findById(roomId, (error: any, room: any) => {
      if (error || !room) {
        return res.status(404).json({
          message: "Room not found"
        });
      }

      const isUserExist = this.userExistInRoom(room.users, userId);
      debugger

      if (isUserExist) {
        res.json({
          message: "User already exist"
        });
      } else {
        if (room.type === 'private') {
          if (bcrypt.compareSync(password, room.password)) {
            this.addUserToRoom(room, userId, res);
          } else {
            res.status(400).json({
              message: "Incorrect Password"
            });
          }
        } else {
          this.addUserToRoom(room, userId, res);
        }
      }
    });
  };

  removeUser = (req: any, res: any) => {
    const { currentRoomId, userId } = req.body;

    RoomModel.findById(currentRoomId, (error: any, room: any) => {
      if (error || !room) {
        return res.status(404).json({
          message: "Room not found"
        });
      }

      const isUserExist = this.userExistInRoom(room.users, userId);

      if (isUserExist) {
        const updatedUserIds = room.users.filter((id: any) => id != userId);
        const removedUserId = room.users.find((id: any) => id == userId);

        Object.assign(room, { users: updatedUserIds });

        room.save()
          .then((room: any) => {
            UserModel.findById(removedUserId, (error: any, user: any) => {
              RoomModel.findById(room._id)
                .populate('users', 'email fullname avatar isOnline socketId last_seen')
                .exec((error: any, room: any) => {
                  // Update current room for Room Users
                  this.io.in(room._id).emit('UpdateCurrentRoom', { status: 'success', room: room });

                  res.json({
                    roomId: room._id,
                    socketId: user.socketId
                  });
                });
            });
          })
          .catch((error: any) => {
            res.status(500).json({
              message: 'Room not updated',
              error
            });
          });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    });
  };

  /**
   * PUBLIC METHODS
   */
  userIsRoomAdmin = (authors: any, userId: any) => {
    return (authors || []).includes(userId);
  };

  userExistInRoom = (users: any, userId: any) => {
    return (users || []).includes(userId);
  };

  addUserToRoom = (room: any, userId: any, res: any) => {
    room.users.push(userId);

    room.save()
      .then((room: any) => {
        RoomModel.findById(room._id)
          .populate('users', 'email fullname avatar isOnline socketId last_seen')
          .exec((err: any, room: any) => {
            if (err || !room) {
              return res.status(404).json({
                message: "Room not found"
              });
            }

            // Update current room for Room Users
            this.io.in(room._id).emit('UpdateCurrentRoom', { status: 'success', room: room });

            res.json(room);
          });
      })
      .catch((error: any) => {
        res.status(500).json({
          message: 'Room not updated',
          error
        });
      });
  };
}

export default RoomController;
