import jwt from 'jsonwebtoken';
import { reduce } from 'lodash';
import config from './config';

export default (user: any) => {
  let token = jwt.sign(
    {
      data: reduce(
        user,
        (result: any, value, key) => {
          if (key !== 'password') {
            result[key] = value;
          }
          return result;
        },
        {},
      ),
    },
    config.secretJWT,
    {
      expiresIn: config.maxAgeJWT,
      algorithm: 'HS256',
    },
  );

  return token;
};
