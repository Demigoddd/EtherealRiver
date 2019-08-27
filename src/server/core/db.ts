import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/EtherealRiver", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
