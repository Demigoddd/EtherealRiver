import bodyParser from "body-parser";
import cors from "cors";
import { Express } from "express";
import { Server } from "socket.io";

import { updateLastSeen, checkAuth } from "../middlewares";
import { loginValidation, registerValidation } from "../utils/validations";
import { UserCtrl, RoomCtrl } from "../controllers";

const createRoutes = (app: Express, io: Server) => {
  const UserController = new UserCtrl(io);
  const RoomController = new RoomCtrl(io);

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
  app.delete("/room/:id", RoomController.delete);
  app.post("/room/create", RoomController.create);
};

export default createRoutes;
