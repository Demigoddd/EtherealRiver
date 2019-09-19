import React from 'react';
import { connect } from "react-redux";
import { RoomAction } from '../../../utils/state/actions';
import { Popconfirm, Divider, Button, Typography } from 'antd';

const MessageHeader: React.FC<any> = ({
  userId,
  currentRoomName,
  currentRoomId,
  isUserRoomAdmin,
  fetchRemoveUserFromRoom,
  fetchDeleteRoom,
  fetchUpdateRoom
}) => {

  const leaveTheRoom = () => {
    fetchRemoveUserFromRoom({ currentRoomId: currentRoomId, adminId: undefined, userId: userId });
  };

  const confirmDeleteRomm = () => {
    fetchDeleteRoom(currentRoomId);
  };

  const setRoomName = (newTitle: any) => {
    fetchUpdateRoom({ roomId: currentRoomId, property: 'name', data: newTitle });
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

const mapStateToProps = (state: any) => ({
  userId: state.user.data._id,
  currentRoomId: state.rooms.currentRoom._id,
  currentRoomName: state.rooms.currentRoom.name,
  isUserRoomAdmin: (state.rooms.currentRoom.authors || []).includes(state.user.data._id)
});

export default connect(mapStateToProps, RoomAction)(MessageHeader);
