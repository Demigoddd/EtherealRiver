import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  text: {
    type: string;
    require: boolean;
  };
  room: {
    type: Schema.Types.ObjectId;
    ref: string;
    require: true;
  };
  user: {
    type: Schema.Types.ObjectId;
    ref: string;
    require: true;
  };
  emotions: any;
}

const MessageSchema = new Schema(
  {
    text: { type: Schema.Types.String, require: true },
    room: { type: Schema.Types.ObjectId, ref: "Room", require: true },
    user: { type: Schema.Types.ObjectId, ref: "User", require: true },
    emotions: {
      likes: [{
        type: Schema.Types.String
      }],
      dislikes: [{
        type: Schema.Types.String
      }],
      other: [{
        type: Schema.Types.String
      }],
    }
  },
  {
    timestamps: true
  }
);

const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);

export default MessageModel;
