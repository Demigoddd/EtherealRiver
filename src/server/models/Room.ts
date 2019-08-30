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
  users: [{
    type: Schema.Types.ObjectId;
    ref: string;
  }];
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
      require: true,
      ref: "User"
    }],
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
