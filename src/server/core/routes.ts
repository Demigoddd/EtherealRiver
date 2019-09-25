import path from 'path';
import bodyParser from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import { Server } from "socket.io";

import multer from "./multer";
import config from '../utils/config';
import { updateLastSeen, checkAuth } from "../middlewares";
import { loginValidation, registerValidation } from "../utils/validations";
import { UserCtrl, RoomCtrl, MessageCtrl, UploadCtrl } from "../controllers";

const createRoutes = (app: Express, io: Server) => {
  const UserController = new UserCtrl(io);
  const RoomController = new RoomCtrl(io);
  const MessageController = new MessageCtrl(io);
  const UploadFileController = new UploadCtrl();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(checkAuth);
  app.use(updateLastSeen);

  // User Auth
  app.post("/user/login", loginValidation, UserController.login);
  app.post("/user/socialLogin", loginValidation, UserController.socialLogin);
  app.post("/user/register", registerValidation, UserController.create);
  app.post("/user/socialRegister", registerValidation, UserController.socialRegister);
  app.post("/user/sendVerifyEmail", UserController.sendVerifyEmail);

  // Other API
  app.get("/user/me", UserController.getMe);
  app.get("/user/verify", UserController.verify);
  app.get("/user/find", UserController.findUsers);
  app.get("/user/:id", UserController.show);
  app.delete("/user/:id", UserController.delete);

  app.get("/room/getAll", RoomController.getAll);
  app.get("/room/:id", RoomController.index);
  app.post("/room/updateRoom", RoomController.updateRoom);
  app.post("/room/addUser", RoomController.addUser);
  app.post("/room/removeUser", RoomController.removeUser);
  app.post("/room", RoomController.create);
  app.delete("/room/:id", RoomController.delete);

  app.get("/messages", MessageController.index);
  app.post("/messages", MessageController.create);
  app.post("/messages/updateMessage", MessageController.updateMessage);
  app.post("/messages/updateEmotion", MessageController.updateEmotion);
  app.delete("/messages/:id/:deleteForAll", MessageController.delete);

  app.post("/files", multer.single("file"), UploadFileController.create);
  app.delete("/files", UploadFileController.delete);

  if (config.isProduction) {
    app.use(express.static(path.join(__dirname, '../build')));

    app.get('*', (req: any, res: any) => {
      res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
    });
  }
};

export default createRoutes;
