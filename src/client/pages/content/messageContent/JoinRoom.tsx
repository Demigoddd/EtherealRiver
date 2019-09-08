import React from 'react';
import { Button } from 'antd';

const JoinRoom: React.FC<any> = ({ joinRoomCallback, roomTitle }) => {
  return (
    <div className="message-content__join-room">
      <p>{roomTitle}</p>
      <Button type="primary" onClick={() => joinRoomCallback()}>Join Room</Button>
    </div>
  );
};

export default JoinRoom;
