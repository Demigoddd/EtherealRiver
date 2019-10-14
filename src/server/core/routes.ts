import path from 'path';
import bodyParser from "body-parser";
import cors from "cors";
import express, { Express } from "express";
import { Server } from "socket.io";

import multer from "./multer";
import { config } from "../utils";
import { checkAuth } from "../utils";
import { loginValidation, registerValidation } from "../utils/validations";
import { UserCtrl, RoomCtrl, MessageCtrl, UploadCtrl } from "../controllers";

const createRoutes = (app: Express, io: Server) => {
  const UserController = new UserCtrl(io);
  const RoomController = new RoomCtrl(io);
  const MessageController = new MessageCtrl(io);
  const UploadFileController = new UploadCtrl(io);

  app.use(cors());
  app.use(bodyParser.json());

  // User Auth
  app.post("/user/login", loginValidation, UserController.login);
  app.post("/user/socialLogin", loginValidation, UserController.socialLogin);
  app.post("/user/register", registerValidation, UserController.create);
  app.post("/user/socialRegister", registerValidation, UserController.socialRegister);
  app.post("/user/sendVerifyEmail", UserController.sendVerifyEmail);
  app.get("/user/verify", UserController.verify);

  // User API
  app.get("/user/me", checkAuth, UserController.getMe);
  app.get("/user/find", checkAuth, UserController.findUsers);
  app.get("/user/:id", checkAuth, UserController.show);
  app.delete("/user/:id", checkAuth, UserController.delete);

  // Room API
  app.get("/room/getAll", checkAuth, RoomController.getAll);
  app.get("/room/:id", checkAuth, RoomController.index);
  app.post("/room/updateRoom", checkAuth, RoomController.updateRoom);
  app.post("/room/addUser", checkAuth, RoomController.addUser);
  app.post("/room/removeUser", checkAuth, RoomController.removeUser);
  app.post("/room", checkAuth, RoomController.create);
  app.delete("/room/:id", checkAuth, RoomController.delete);

  // Message API
  app.get("/messages", checkAuth, MessageController.index);
  app.post("/messages", checkAuth, MessageController.create);
  app.post("/messages/updateMessage", checkAuth, MessageController.updateMessage);
  app.post("/messages/updateEmotion", checkAuth, MessageController.updateEmotion);
  app.delete("/messages/:id/:deleteForAll", checkAuth, MessageController.delete);

  // File API
  app.post("/files", checkAuth, multer.single("file"), UploadFileController.create);
  app.delete("/files/:id", checkAuth, UploadFileController.delete);

  // If prod send build React APP
  if (config.isProduction) {
    app.use(express.static(path.join(__dirname, '../../../build')));

    app.get('*', (req: any, res: any) => {
      res.sendFile(path.resolve(__dirname, '../../../build', 'index.html'));
    });
  }
};

export default createRoutes;
