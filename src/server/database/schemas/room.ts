import * as mongoose from 'mongoose';

var RoomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  connections: { type: [{ userId: String, socketId: String }] }
});

var roomModel = mongoose.model('room', RoomSchema);

export default roomModel;
