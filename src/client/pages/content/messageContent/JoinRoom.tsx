import React from 'react';
import { connect } from "react-redux";
import { Button } from 'antd';
import { RoomAction } from '../../../utils/state/actions';

const JoinRoom: React.FC<any> = ({ fetchAddUserToRoom, currentRoomName, currentRoomId, userId }) => {
  return (
    <div className="message-content__join-room">
      <p>{currentRoomName}</p>
      <Button type="primary" onClick={() => fetchAddUserToRoom({ currentRoomId: currentRoomId, userId: userId })}>Join Room</Button>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  userId: state.user.data._id,
  currentRoomId: state.rooms.currentRoom._id,
  currentRoomName: state.rooms.currentRoom.name
});

export default connect(mapStateToProps, RoomAction)(JoinRoom);
