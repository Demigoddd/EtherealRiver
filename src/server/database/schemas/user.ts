import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

const SALT_WORK_FACTOR = 10;
const DEFAULT_USER_PICTURE = "";

const UserSchema: any = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, default: null },
  socialId: { type: String, default: null },
  picture: { type: String, default: DEFAULT_USER_PICTURE }
});

UserSchema.pre.save = function (next: any) {
  const user = this;

  if (!user.picture) {
    user.picture = DEFAULT_USER_PICTURE;
  }

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err: any, salt: any) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err: any, hash: any) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
}

UserSchema.methods.validatePassword = function (password: any, callback: any) {
  bcrypt.compare(password, this.password, function (err: any, isMatch: any) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

const userModel = mongoose.model('user', UserSchema);

export default userModel;
