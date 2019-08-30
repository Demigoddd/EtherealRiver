import express from "express";
import bcrypt from "bcrypt";
import socket from "socket.io";
import { validationResult } from "express-validator";

import { UserModel } from "../models";
import { createJWToken } from "../utils";
import { sendEmail } from "../utils";
import config from "../utils/config";

class UserController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  show = (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;

    UserModel.findById(id, (err, user) => {
      if (err) {
        return res.status(404).json({
          message: "User not found"
        });
      }
      res.json(user);
    });
  };

  getMe = (req: any, res: express.Response) => {
    const id: string = req.user._id;

    UserModel.findById(id, (err, user: any) => {
      if (err || !user) {
        return res.status(404).json({
          message: "User not found"
        });
      }
      res.json(user);
    });
  };

  findUsers = (req: any, res: express.Response) => {
    const query: string = req.query.query;
    UserModel.find()
      .or([
        { fullname: new RegExp(query, "i") },
        { email: new RegExp(query, "i") }
      ])
      .then((users: any) => res.json(users))
      .catch((err: any) => {
        return res.status(404).json({
          status: "error",
          message: err
        });
      });
  };

  delete = (req: express.Request, res: express.Response) => {
    const id: string = req.params.id;
    UserModel.findOneAndRemove({ _id: id })
      .then(user => {
        if (user) {
          res.json({
            message: `User ${user.fullname} deleted`
          });
        }
      })
      .catch(() => {
        res.json({
          message: `User not found`
        });
      });
  };

  create = (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const newUser = new UserModel({
      email: req.body.email,
      fullname: req.body.fullname,
      password: req.body.password,
    });

    newUser.save()
      .then((obj: any) => {
        res.json(obj);
      })
      .catch((reason: any) => {
        res.status(500).json({
          status: "error",
          message: reason
        });
      });
  };

  socialRegister = (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    UserModel.findOne({email: req.body.email}, (err: any, user: any) => {
      if (err) {
        res.status(500).json({
          status: "Error when creating New User."
        });
      }

      if (user) {
        if (!user.socialId) {
          UserModel.findOne({_id: user._id}, (err: any, user: any) => {
            if (err || !user) {
              return res.status(404).json({
                message: "User not found"
              });
            }

            user.socialId = req.body.socialId;

            user.save()
              .then((obj: any) => {
                res.json({
                  data: obj,
                  message: 'User Updated.'
                })
              })
              .catch((reason: any) => {
                res.status(500).json({
                  status: "error",
                  message: reason
                });
              });
          });
        } else {
          res.json({
            data: user,
            message: 'User already exist.'
          });
        }
      }

      if (!user) {
        let newUser = new UserModel({
          email: req.body.email,
          fullname: req.body.fullname,
          socialId: req.body.socialId,
          avatar: req.body.imageUrl,
          confirmed: true,
        });

        newUser.save()
          .then((obj: any) => {
            res.json({data: obj});
          })
          .catch((reason: any) => {
            res.status(500).json({
              status: "error",
              message: reason
            });
          });
      }
    });
  };

  sendVerifyEmail = (req: express.Request, res: express.Response) => {
    const email = req.body.email;

    UserModel.findOne({ email: email }, (err, user: any) => {
      if (err || !user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      const confirmLink = (config.clientBaseUrl + "/register/verify#hash=" + user.confirm_hash);

      const emailBody = {
        to: email,
        subject: "Ethereal River: Email Verification.",
        text: "Please click on this link" + confirmLink + " to activate your email.",
        html: "<b>Please click on this <a href='"+ confirmLink +"'>Link</a> to activate your email.</b>"
      }

      sendEmail(emailBody)
        .then((info: any) => {
          res.json({
            info: info,
            status: "success",
            message: "Email Send!"
          });
        })
        .catch((error: any) => {
          res.status(500).json({
            status: "error",
            message: error
          });
        });
    });
  };

  verify = (req: express.Request, res: express.Response) => {
    const hash = req.query.hash;

    if (!hash) {
      return res.status(422).json({ errors: "Invalid hash" });
    }

    UserModel.findOne({ confirm_hash: hash }, (err, user) => {
      if (err || !user) {
        return res.status(404).json({
          status: "error",
          message: "Hash not found"
        });
      }

      user.confirmed = true;

      user.save(err => {
        if (err) {
          return res.status(404).json({
            status: "error",
            message: err
          });
        }

        res.json({
          status: "success",
          message: "Account Confirmed!"
        });
      });
    });
  };

  login = (req: express.Request, res: express.Response) => {
    const postData = {
      email: req.body.email,
      password: req.body.password
    };

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    UserModel.findOne({ email: postData.email }, (err, user: any) => {
      if (err || !user || (!user.password && user.socialId)) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      if (user.confirmed) {
        if (bcrypt.compareSync(postData.password, user.password)) {
          const token = createJWToken(user);
          res.json({
            status: "success",
            token
          });
        } else {
          res.status(403).json({
            status: "error",
            message: "Incorrect password or email"
          });
        }
      } else {
        res.status(409).json({
          status: "error",
          message: "Sorry user not confirmed"
        });
      }
    });
  };

  socialLogin = (req: express.Request, res: express.Response) => {
    UserModel.findOne({ email: req.body.email }, (err, user: any) => {
      if (err || !user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      if (user.socialId) {
        const token = createJWToken(user);
        res.json({
          status: "success",
          token
        });
      } else {
        res.status(500).json({
          status: "error",
          message: "Incorrect SocialId."
        });
      }
    });
  };
}

export default UserController;
