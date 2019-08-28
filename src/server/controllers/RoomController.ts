import express from "express";
import socket from "socket.io";

import { RoomModel, MessageModel } from "../models";

class RoomController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  index = (req: any, res: express.Response) => {
    const userId = req.user._id;

    RoomModel.find()
      .or([{ author: userId }, { partner: userId }])
      .populate(["author", "partner"])
      .populate({
        path: "lastMessage",
        populate: {
          path: "user"
        }
      })
      .exec((err, rooms) => {
        if (err) {
          return res.status(404).json({
            message: "Rooms not found."
          });
        }
        return res.json(rooms);
      });
  };

  create = (req: express.Request, res: express.Response) => {
    const postData = {
      author: req.user._id,
      partner: req.body.partner
    };

    const room = new RoomModel(postData);

    room
      .save()
      .then((roomObj: any) => {
        const message = new MessageModel({
          text: req.body.text,
          user: req.user._id,
          room: roomObj._id
        });

        message
          .save()
          .then(() => {
            roomObj.lastMessage = message._id;
            roomObj.save().then(() => {
              res.json(roomObj);
              this.io.emit("SERVER:ROOM_CREATED", {
                ...postData,
                room: roomObj
              });
            });
          })
          .catch((reason: any) => {
            res.json(reason);
          });
      })
      .catch(reason => {
        res.json(reason);
      });
  };

  delete = (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;

    RoomModel.findOneAndRemove({ _id: id })
      .then(rooms => {
        if (rooms) {
          res.json({
            message: `Room deleted`
          });
        }
      })
      .catch(() => {
        res.json({
          message: `Room not found`
        });
      });
  };
}

export default RoomController;
