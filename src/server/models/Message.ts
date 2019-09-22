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
  hideForUsers: any;
  emotions: any;
  attachments: any;
}

const MessageSchema = new Schema(
  {
    text: { type: Schema.Types.String, require: true },
    room: { type: Schema.Types.ObjectId, ref: "Room", require: true },
    user: { type: Schema.Types.ObjectId, ref: "User", require: true },
    hideForUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    emotions: {
      likes: [{
        type: Schema.Types.String
      }],
      dislikes: [{
        type: Schema.Types.String
      }],
      others: [{
        emotion: { type: Schema.Types.String, },
        users: [{ type: Schema.Types.String }]
      }]
    },
    attachments: [{ type: Schema.Types.ObjectId, ref: "UploadFile" }]
  },
  {
    timestamps: true,
    usePushEach: true
  }
);

const MessageModel = mongoose.model<IMessage>("Message", MessageSchema);

export default MessageModel;
