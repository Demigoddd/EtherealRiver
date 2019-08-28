import mongoose, { Schema, Document } from "mongoose";

export interface IRoom extends Document {
  name: {
    type: Schema.Types.String;
    ref: string;
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
  partner: {
    type: Schema.Types.ObjectId;
    ref: string;
  };
  password: {
    type: Schema.Types.String;
    ref: string;
  };
  users: [
    {
      type: Schema.Types.String;
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
    name: { type: Schema.Types.String },
    type: { type: Schema.Types.String },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    partner: { type: Schema.Types.ObjectId, ref: "User" },
    password: { type: Schema.Types.String },
    messages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }]
  },
  {
    timestamps: true
  }
);

const RoomModel = mongoose.model<IRoom>("Room", RoomSchema);

export default RoomModel;
