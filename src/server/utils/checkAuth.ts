import { verifyJWTToken } from "../utils";

export default (req: any, res: any, next: any) => {
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
