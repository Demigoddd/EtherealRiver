import jwt from "jsonwebtoken";
import config from './config';

export default (accessToken: string) =>
  new Promise((resolve, reject) => {
    jwt.verify(accessToken, config.secretJWT, (err: any, decodedData: any) => {
      if (err || !decodedData) {
        return reject(err);
      }

      resolve(decodedData);
    });
  });
