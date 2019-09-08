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
  password: {
    type: Schema.Types.String;
    ref: string;
  };
  authors: [{
    type: Schema.Types.ObjectId;
    ref: string;
    require: true;
  }];
  users: any,
  messages: [{
    type: Schema.Types.ObjectId;
    ref: string;
  }];
}

const RoomSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      require: true,
      unique: true,
      dropDups: true
    },
    type: {
      type: Schema.Types.String,
      require: true,
      enum: ['public', 'private', 'personal']
    },
    password: {
      type: Schema.Types.String
    },
    authors: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    }],
    users: [{
      _id: {
        type: Schema.Types.Number
      },
      email: {
        type: Schema.Types.String
      },
      fullname: {
        type: Schema.Types.String
      },
      avatar: {
        type: Schema.Types.String
      },
      isOnline: {
        type: Schema.Types.String
      },
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
