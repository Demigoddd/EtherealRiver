import jwt from 'jsonwebtoken';
import { reduce } from 'lodash';
import { config } from '../utils';

export default (user: any) => {
  let token = jwt.sign(
    {
      data: reduce(
        user,
        (result: any, value: any, key: any) => {
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
