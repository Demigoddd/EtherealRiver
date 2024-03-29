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
}

const RoomSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      require: true,
      unique: true,
      dropDups: true,
      maxlength: 60
    },
    type: {
      type: Schema.Types.String,
      require: true,
      enum: ['public', 'private']
    },
    password: {
      type: Schema.Types.String
    },
    authors: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true
    }],
    users: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true
    }]
  },
  {
    timestamps: true
  }
);

const RoomModel = mongoose.model<IRoom>("Room", RoomSchema);

export default RoomModel;
