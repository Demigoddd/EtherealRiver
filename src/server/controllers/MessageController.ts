import { Request, Response } from "express";
import { Server } from "socket.io";

import { MessageModel, RoomModel } from "../models";

class MessageController {
  io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  index = (req: any, res: Response) => {
    const roomId: string = req.query.room;
    const userId: string = req.user._id;

    MessageModel.find({ room: roomId, hideForUsers: { $nin: [userId] } })
      .populate(["user", "attachments"])
      .exec((error: any, messages: any) => {
        if (error) {
          return res.status(404).json({
            message: "Messages not found"
          });
        }

        return res.json(messages);
      });
  };

  updateMessage = (req: any, res: Response) => {
    const messageId: string = req.body.messageId;
    const messageText: string = req.body.messageText;

    MessageModel.findById(messageId, (error: any, message: any) => {
      if (error || !message) {
        return res.status(404).json({
          message: "Messages not found"
        });
      }

      message.text = messageText;
      message.save()
        .then((obj: any) => {
          obj.populate(["dialog", "user", "attachments"], (error: any, newMessage: any) => {
            if (error) {
              return res.status(500).json({
                status: "error",
                message: error
              });
            }

            this.io.in(newMessage.room._id).emit("UpdateMessage", newMessage);

            res.json(newMessage);
          });
        })
        .catch((error: any) => {
          res.status(500).json({
            message: 'Error updating message',
            error: error
          });
        });
    });
  };

  updateEmotion = (req: any, res: Response) => {
    const messageId: string = req.body.messageId;
    const type: string = req.body.type;
    const userId: string = req.user._id;

    MessageModel.findById(messageId, (error: any, message: any) => {
      if (error || !message) {
        return res.status(404).json({
          message: "Messages not found"
        });
      }

      const likes = message.emotions.likes;
      const dislikes = message.emotions.dislikes;
      const others = message.emotions.others;

      if (type == "like") {
        const hasUserId = likes.includes(userId);

        if (hasUserId) {
          likes.splice(likes.indexOf(userId), 1);
        } else {
          likes.push(userId);
        }
      } else if (type == "dislike") {
        const hasUserId = dislikes.includes(userId);

        if (hasUserId) {
          dislikes.splice(dislikes.indexOf(userId), 1);
        } else {
          dislikes.push(userId);
        }
      } else {
        const emotion = others.find((n: any) => n.emotion == type);

        if (emotion) {
          const hasUserId = emotion.users.includes(userId);

          if (hasUserId) {
            emotion.users.splice(emotion.users.indexOf(userId), 1);

            // If Emotion not have users Remove this emotion.
            if (emotion.users.length <= 0) {
              const removeIndex = others.map((n: any) => n._id).indexOf(emotion._id);

              others.splice(removeIndex, 1);
            }
          } else {
            // If there are no emotions of this type, then add it.
            emotion.users.push(userId);
          }
        } else {
          others.push({ emotion: type, users: [userId] });
        }
      }

      message.save()
        .then((obj: any) => {
          obj.populate(["dialog", "user", "attachments"], (error: any, newMessage: any) => {
            if (error) {
              return res.status(500).json({
                status: "error",
                message: error
              });
            }

            this.io.in(newMessage.room._id).emit("UpdateMessage", newMessage);

            res.json(newMessage);
          });
        })
        .catch((error: any) => {
          res.status(500).json({
            message: 'Error updating message',
            error: error
          });
        });
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

          this.io.in(message.room).emit("NewMessage", message);

          res.json(message);
        });
      })
      .catch((reason: any) => {
        res.json(reason);
      });
  };

  delete = (req: any, res: Response) => {
    const id: string = req.params.id;
    const deleteForAll: string = req.params.deleteForAll;
    const userId: string = req.user._id;

    MessageModel.findById(id, (error: any, message: any) => {
      if (error || !message || message.user != userId) {
        res.status(500).json({
          message: 'Message not found'
        });
      } else {
        if (deleteForAll == "true") {
          message.remove()
            .then((obj: any) => {
              res.json({
                message: 'Message deleted'
              });
            })
            .catch((error: any) => {
              res.status(500).json({
                message: 'Error deleting message',
                error: error
              });
            });
        } else {
          message.hideForUsers.push(userId);
          message.save()
            .then((obj: any) => {
              res.json({
                message: 'Message deleted'
              });
            })
            .catch((error: any) => {
              res.status(500).json({
                message: 'Error deleting message',
                error: error
              });
            });
        }
      }
    });
  };
}

export default MessageController;
