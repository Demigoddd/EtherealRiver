import { verifyJWTToken } from "../utils";

export default (req: any, res: any, next: any) => {
  if (
    req.path === "/user/login" ||
    req.path === "/user/register" ||
    req.path === "/user/verify"
  ) {
    return next();
  }

  const accessToken = req.headers.accessToken;

  verifyJWTToken(accessToken)
    .then((user: any) => {
      req.user = user.data._doc;
      next();
    })
    .catch((err: any) => {
      res.status(403).json({ message: "Invalid auth token provided." });
    });
};
