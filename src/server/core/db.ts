import mongoose from "mongoose";
import config from "../utils/config";

mongoose.connect(config.db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
