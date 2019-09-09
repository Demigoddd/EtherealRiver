import React, { useState } from 'react';
import { Popconfirm, Divider, Button, Typography } from 'antd';
import { roomsSocket } from '../../../utils/socket';

const MessageHeader: React.FC<any> = ({ userId, currentRoomId, isUserRoomAdmin }) => {
  const [title, setTitle] = useState('Room Title');

  const leaveTheRoom = () => {
    roomsSocket.emit("Leave", currentRoomId, userId);
  }

  const confirmDeleteRomm = () => {
    roomsSocket.emit("Destroy", currentRoomId);
  }

  return (
    <>
      <div className="message-content__header">
        <Typography.Paragraph
          className="message-content__header--title"
          editable={{ onChange: (newTitle) => setTitle(newTitle) }}
        >
          {title}
        </Typography.Paragraph>
        {
          isUserRoomAdmin
            ? <Popconfirm
                title="Are you sure delete this Room ?"
                placement="leftTop"
                onConfirm={confirmDeleteRomm}
                okText="Yes"
                cancelText="No"
              >
                <Button size="small" shape="circle" icon="delete" />
              </Popconfirm>
            : <Popconfirm
                title="Are you sure want to leave the room ?"
                placement="leftTop"
                onConfirm={leaveTheRoom}
                okText="Yes"
                cancelText="No"
              >
                <Button size="small" shape="circle" icon="close" />
              </Popconfirm>
        }
      </div>
      <Divider />
    </>
  );
};

export default MessageHeader;