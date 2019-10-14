import jwt from "jsonwebtoken";
import { config } from '../utils';

export default (token: string) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secretJWT, (err: any, decodedData: any) => {
      if (err || !decodedData) {
        return reject(err);
      }

      resolve(decodedData);
    });
  });
