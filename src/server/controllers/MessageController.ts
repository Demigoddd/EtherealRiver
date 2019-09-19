import { Request, Response } from "express";
import { Server } from "socket.io";

import { MessageModel, RoomModel } from "../models";

class MessageController {
  io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  index = (req: Request, res: Response) => {
    const roomId: string = req.query.room;

    MessageModel.find({ room: roomId })
      .populate(["room", "user"])
      .exec((err: any, messages: any) => {
        if (err) {
          return res.status(404).json({
            message: "Messages not found"
          });
        }
        return res.json(messages);
      });
  };

  create = (req: any, res: Response) => {
    const postData = {
      text: req.body.text,
      room: req.body.roomId,
      user: req.user._id,
    };

    new MessageModel(postData).save()
      .then((message: any) => {
        res.json(message);

        this.io.emit("NewMessage", message);
      })
      .catch((reason: any) => {
        res.json(reason);
      });
  };

  delete = (req: Request, res: Response) => {
    const id: string = req.params.id;

    MessageModel.findOneAndRemove({ _id: id })
      .then((message: any) => {
        if (message) {
          res.json({
            message: 'Message deleted'
          });
        }
      })
      .catch(() => {
        res.json({
          message: 'Message not found'
        });
      });
  };
}

export default MessageController;
