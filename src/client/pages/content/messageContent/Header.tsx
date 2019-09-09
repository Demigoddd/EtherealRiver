import React, { useState } from 'react';
import { Popconfirm, Divider, Button, Typography } from 'antd';
import { roomsSocket } from '../../../utils/socket';

const MessageHeader: React.FC<any> = ({ user, currentRoom }) => {
  const [title, setTitle] = useState('Room Title');
  const isUserRoomAdmin = (currentRoom.authors || []).includes(user._id);

  const leaveTheRoom = () => {
    roomsSocket.emit("Leave", currentRoom._id, user._id);
  }

  const confirmDeleteRomm = () => {
    roomsSocket.emit("Destroy", currentRoom._id);
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