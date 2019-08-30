import { check } from 'express-validator';

export default [
  check('email').isEmail()
];
