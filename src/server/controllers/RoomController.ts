import express from "express";
import socket from "socket.io";

import { RoomModel } from "../models";
import { UserModel } from "../models";

class RoomController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  index = (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;

    RoomModel.findById(id, (err, room) => {
      if (err) {
        return res.status(404).json({
          message: "Room not found"
        });
      }
      res.json(room);
    });
  };

  findRooms = (req: any, res: express.Response) => {
    const query: string = req.query.query;

    if (query === 'all') {
      RoomModel.find({})
        .then((rooms: any) => {
          const publicRoom = rooms.filter((r: any) => r.type === 'public');
          const privateRoom = rooms.filter((r: any) => r.type === 'private');
          const personalRoom = rooms.filter((r: any) => r.type === 'personal');

          const allRoomsData = {
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
    } else {
      RoomModel.find()
        .or([
          { type: new RegExp(query, "i") },
        ])
        .then((rooms: any) => res.json(rooms))
        .catch((err: any) => {
          return res.status(404).json({
            status: "error",
            message: err
          });
        });
    }
  };

  create = (req: express.Request, res: express.Response) => {
    let postData = {};

    // lastname95@inbox.ru
    if (req.body.email) {
      UserModel.find({email: req.body.email}, (err: any, user: any) => {
        if (err || !user) {
          return res.status(404).json({
            message: "User not found"
          });
        }

        postData = {
          name: user.fullname,
          type: req.body.roomType,
          author: req.user._id,
          users: [user._id]
        };

        new RoomModel(postData).save()
          .then((roomObj: any) => {
            res.json({
              data: roomObj,
              status: 'success',
              message: 'Room created'
            });
          })
          .catch((reason: any) => {
            res.status(500).json({
              status: "error",
              message: reason
            });
          });
      });
    } else {
      postData = {
        name: req.body.roomName,
        type: req.body.roomType,
        author: req.user._id,
        password: req.body.password,
      };

      new RoomModel(postData).save()
        .then((roomObj: any) => {
          res.json({
            data: roomObj,
            status: 'success',
            message: 'Room created'
          });
        })
        .catch((reason: any) => {
          res.status(500).json({
            status: "error",
            message: reason
          });
        });
    }
  };

  delete = (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;

    RoomModel.findOneAndRemove({ _id: id })
      .then(rooms => {
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
