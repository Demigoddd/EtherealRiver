import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import { Express } from "express";
import { Server } from "socket.io";

import { updateLastSeen, checkAuth } from "../middlewares";
import { loginValidation, registerValidation } from "../utils/validations";
import { UserCtrl, DialogCtrl, MessageCtrl } from "../controllers";

const createRoutes = (app: Express, io: Server) => {
  const UserController = new UserCtrl(io);
  const DialogController = new DialogCtrl(io);
  const MessageController = new MessageCtrl(io);

  app.use(cors());
  app.use(bodyParser.json());
  app.use(checkAuth);
  app.use(updateLastSeen);
  app.use(passport.initialize());

  // Google Auth
  app.post("/user/google", UserController.authGoogle);
  app.post("/user/google/callback", UserController.authGoogleCallback);
  app.post("/user/google/success", UserController.authGoogleSuccess);

  // User Auth
  app.post("/user/login", loginValidation, UserController.login);
  app.post("/user/register", registerValidation, UserController.create);
  app.post("/user/sendVerifyEmail", UserController.sendVerifyEmail);

  // Other API
  app.get("/user/me", UserController.getMe);
  app.get("/user/verify", UserController.verify);
  app.get("/user/find", UserController.findUsers);
  app.get("/user/:id", UserController.show);
  app.delete("/user/:id", UserController.delete);

  app.get("/dialogs", DialogController.index);
  app.delete("/dialogs/:id", DialogController.delete);
  app.post("/dialogs", DialogController.create);

  app.get("/messages", MessageController.index);
  app.post("/messages", MessageController.create);
  app.delete("/messages/:id", MessageController.delete);
};

export default createRoutes;
