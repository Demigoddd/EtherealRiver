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

  getAll = (req: any, res: any) => {
    RoomModel.find({})
      .then((rooms: any) => {
        const myRoom = rooms.filter((r: any) => r.users.includes(req.user._id));
        const personalRoom = rooms.filter((r: any) => r.type === 'personal').filter((pr: any) => pr.authors.includes(req.user._id));
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

  create = (req: any, res: any) => {
    let postData = {};

    if (req.body.roomType === "public") {
      postData = {
        name: req.body.roomName,
        type: req.body.roomType,
        authors: [req.user._id]
      };
    } else if (req.body.roomType === "private") {
      postData = {
        name: req.body.roomName,
        type: req.body.roomType,
        password: req.body.password,
        authors: [req.user._id],
      };
    } else if (req.body.roomType === "personal") {
      UserModel.findOne({ email: req.body.email }, (err: any, user: any) => {
        if (err || !user) {
          return res.status(404).json({
            message: "User not found"
          });
        }

        postData = {
          name: user.fullname,
          type: req.body.roomType,
          authors: [req.user._id]
        };
      });
    }

    new RoomModel(postData).save();
      // .then((roomObj: any) => {
      //   res.json({
      //     data: roomObj,
      //     status: 'success',
      //     message: 'Room created'
      //   });
      // })
      // .catch((reason: any) => {
      //   res.status(500).json({
      //     status: "error",
      //     message: reason
      //   });
      // });
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
