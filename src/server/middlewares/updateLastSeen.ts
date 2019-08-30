import { UserModel } from "../models";

export default (
  req: any,
  __: any,
  next: any
) => {
  if (req.user) {
    UserModel.findOneAndUpdate(
      { _id: req.user._id },
      {
        last_seen: new Date()
      },
      { new: true },
      () => {}
    );
  }
  next();
};
