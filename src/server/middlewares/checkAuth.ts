import { verifyJWTToken } from "../utils";

export default (req: any, res: any, next: any) => {
  if (
    req.path === "/" ||
    req.path === "/user/login" ||
    req.path === "/user/socialLogin" ||
    req.path === "/user/register" ||
    req.path === "/user/socialRegister" ||
    req.path === "/user/sendVerifyEmail" ||
    req.path === "/user/verify"
  ) {
    return next();
  }

  const token = req.headers.token;

  verifyJWTToken(token)
    .then((user: any) => {
      req.user = user.data._doc;
      next();
    })
    .catch((err: any) => {
      res.status(403).json({ message: "Invalid auth token provided." });
    });
};
