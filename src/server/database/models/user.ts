import { userModel } from '../../database';

const create = (data: any, callback: any) => {
  const newUser = new userModel(data);
  newUser.save(callback);
};

const findOne = (data: any, callback: any) => {
  userModel.findOne(data, callback);
}

const findById = (id: number, callback: any) => {
  userModel.findById(id, callback);
}

const findOrCreate = (data: any, callback: any) => {
  findOne({ 'socialId': data.id }, (err: any, user: any) => {
    if (err) { return callback(err); }

    if (user) {
      return callback(err, user);
    } else {
      let userData = {
        username: data.displayName,
        socialId: data.id,
        picture: data.photos[0].value || null
      };

      if (data.provider == "facebook" && userData.picture) {
        userData.picture = "http://graph.facebook.com/" + data.id + "/picture?type=large";
      }

      create(userData, (err: any, newUser: any) => {
        callback(err, newUser);
      });
    }
  });
}

const isAuthenticated = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
}

export {
  create,
  findOne,
  findById,
  findOrCreate,
  isAuthenticated
};
