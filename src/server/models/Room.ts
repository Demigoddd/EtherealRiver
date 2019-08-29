import mongoose, { Schema, Document } from "mongoose";

export interface IRoom extends Document {
  name: {
    type: Schema.Types.String;
    ref: string;
    unique: true;
    require: true;
  };
  type: {
    type: Schema.Types.String;
    ref: string;
    require: true;
  };
  author: {
    type: Schema.Types.ObjectId;
    ref: string;
    require: true;
  };
  password: {
    type: Schema.Types.String;
    ref: string;
  };
  users: [
    {
      type: Schema.Types.ObjectId;
      ref: string;
    }
  ];
  messages: [
    {
      type: Schema.Types.ObjectId;
      ref: string;
    }
  ];
}

const RoomSchema = new Schema(
  {
    name: { type: Schema.Types.String, require: true, unique: true, dropDups: true },
    type: { type: Schema.Types.String, require: true },
    author: { type: Schema.Types.ObjectId, require: true, ref: "User" },
    password: { type: Schema.Types.String },
    users: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    messages: [{
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }]
  },
  {
    timestamps: true
  }
);

const RoomModel = mongoose.model<IRoom>("Room", RoomSchema);

export default RoomModel;
