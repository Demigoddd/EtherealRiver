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
      .populate(["room", "user", "attachments"])
      .exec((error: any, messages: any) => {
        if (error) {
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
      attachments: req.body.attachments,
    };

    new MessageModel(postData).save()
      .then((obj: any) => {
        obj.populate(["dialog", "user", "attachments"], (error: any, message: any) => {
          if (error) {
            return res.status(500).json({
              status: "error",
              message: error
            });
          }

          res.json(message);

          this.io.emit("NewMessage", message);
        });
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
