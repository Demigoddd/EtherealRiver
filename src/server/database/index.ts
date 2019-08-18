import mongoose from 'mongoose';
import roomModel from './schemas/room';
import userModel from './schemas/user';
import config from '../utils/config';

// Connect to the database
// construct the database URI and encode username and password.
const dbURI = config.db;

mongoose.connect(dbURI, { useNewUrlParser: true });

// Throw an error if the connection fails
mongoose.connection.on('error', function (err: any) {
  if (err) throw err;
});

export {
  mongoose,
  roomModel,
  userModel
};
