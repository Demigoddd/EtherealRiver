import React, { useState } from 'react';
import { connect } from "react-redux";
import { Button, Input } from 'antd';
import { RoomAction } from '../../../utils/state/actions';

const JoinRoom: React.FC<any> = ({
  fetchAddUserToRoom,
  roomLoading,
  currentRoomType,
  currentRoomName,
  currentRoomId,
  userId
}) => {
  const [password, setPassword] = useState("");

  const passwordHandler = (event: any) => {
    setPassword(event.target.value);
  };

  return (
    <div className="message-content__join-room">
      <p>{currentRoomName}</p>
      {
        (currentRoomType === 'private')
        && <div><Input.Password placeholder="Write Room Password" onChange={passwordHandler} /></div>
      }
      <Button type="primary" disabled={roomLoading} onClick={() => fetchAddUserToRoom({ currentRoomId: currentRoomId, userId: userId, password: password })}>Join Room</Button>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  userId: state.user.data._id,
  currentRoomId: state.rooms.currentRoom._id,
  currentRoomName: state.rooms.currentRoom.name,
  currentRoomType: state.rooms.currentRoom.type,
  roomLoading: state.rooms.roomLoading
});

export default connect(mapStateToProps, RoomAction)(JoinRoom);
