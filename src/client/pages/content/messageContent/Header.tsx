import React from 'react';
import { Popconfirm, Divider, Button, Typography } from 'antd';
import { roomsSocket } from '../../../utils/socket';

const MessageHeader: React.FC<any> = ({ userId, currentRoomName, currentRoomId, isUserRoomAdmin }) => {

  const leaveTheRoom = () => {
    roomsSocket.emit("Leave", currentRoomId, userId);
  };

  const confirmDeleteRomm = () => {
    roomsSocket.emit("Destroy", currentRoomId);
  };

  const setRoomName = (newTitle: any) => {
    roomsSocket.emit("Update", currentRoomId, 'name', newTitle);
  };

  return (
    <>
      <div className="message-content__header">
        {
          isUserRoomAdmin
            ? <Typography.Paragraph
              className="message-content__header--title"
              editable={{ onChange: (newTitle) => setRoomName(newTitle) }}
            >
              {currentRoomName}
            </Typography.Paragraph>
            : <Typography.Paragraph
              className="message-content__header--title"
            >
              {currentRoomName}
            </Typography.Paragraph>
        }

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
