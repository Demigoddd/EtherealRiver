import express from "express";
import socket from "socket.io";

import { MessageModel, RoomModel } from "../models";

class MessageController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  index = (req: express.Request, res: express.Response) => {
    const roomId: string = req.query.room;

    MessageModel.find({ room: roomId })
      .populate(["room", "user"])
      .exec(function (err, messages) {
        if (err) {
          return res.status(404).json({
            message: "Messages not found"
          });
        }
        return res.json(messages);
      });
  };

  create = (req: any, res: express.Response) => {
    const userId = req.user._id;

    const postData = {
      text: req.body.text,
      room: req.body.room_id,
      user: userId
    };

    const message = new MessageModel(postData);

    message
      .save()
      .then((obj: any) => {
        obj.populate(["room", "user"], (err: any, message: any) => {
          if (err) {
            return res.status(500).json({
              status: "error",
              message: err
            });
          }

          RoomModel.findOneAndUpdate(
            { _id: postData.room },
            { lastMessage: message._id },
            { upsert: true },
            function (err) {
              if (err) {
                return res.status(500).json({
                  status: "error",
                  message: err
                });
              }
            }
          );

          res.json(message);

          this.io.emit("SERVER:NEW_MESSAGE", message);
        });
      })
      .catch(reason => {
        res.json(reason);
      });
  };

  delete = (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;
    MessageModel.findOneAndRemove({ _id: id })
      .then(message => {
        if (message) {
          res.json({
            message: `Message deleted`
          });
        }
      })
      .catch(() => {
        res.json({
          message: `Message not found`
        });
      });
  };
}

export default MessageController;
