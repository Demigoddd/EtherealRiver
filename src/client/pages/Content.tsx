import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { UserAction, RoomAction } from '../utils/state/actions';
import { roomsSocket } from '../utils/socket';
import { openNotification } from '../utils/helpers/openNotification';

import RoomList from './content/RoomList';
import MessageContent from './content/MessageContent';
import UserList from './content/UserList';

const Content: React.FC<any> = ({ user, rooms, fetchUserData, fetchAllRoom }) => {
  const [currentRoom, setCurrentRoom] = useState<any>({});
  const userExistInRoom = (currentRoom.users || []).some((u: any) => u._id === user._id);
  const isUserRoomAdmin = (currentRoom.authors || []).includes(user._id);

  const joinHandle = (data: any) => {
    console.log(data.room)
    if (data.status === 'success') {
      setCurrentRoom(data.room);
    } else {
      openNotification({
        title: "Error.",
        text: "Handle Error.",
        type: "error"
      });
    }
  };

  useEffect((): any => {
    fetchUserData();
    fetchAllRoom();

    const UpdateRoomsListHandler = ({ status }: any) => { fetchAllRoom(status) };
    const JoinHandle = (data: any) => { joinHandle(data) };
    roomsSocket.on("UpdateRoomsList", UpdateRoomsListHandler);
    roomsSocket.on("JoinHandle", JoinHandle);

    return () => {
      roomsSocket.off("UpdateRoomsList", UpdateRoomsListHandler);
      roomsSocket.off("JoinHandle", JoinHandle);
    };
  }, [fetchUserData, fetchAllRoom]);

  return (
    <div className="content">
      <div className="content__container">
        <RoomList user={user} rooms={rooms} />
        <MessageContent
          userId={user._id}
          currentRoomId={currentRoom._id}
          currentRoomName={currentRoom.name}
          userExistInRoom={userExistInRoom}
          isUserRoomAdmin={isUserRoomAdmin}
        />
        <UserList
          userId={user._id}
          currentRoomId={currentRoom._id}
          roomUsers={(currentRoom.users || [])}
          isUserRoomAdmin={isUserRoomAdmin}
        />
      </div>
    </div>
  );
};

const { fetchUserData } = UserAction;
const { fetchAllRoom } = RoomAction;

const mapStateToProps = (state: any) => ({
  user: state.user.data,
  rooms: state.rooms
});

const mapDispatchToProps = {
  fetchUserData,
  fetchAllRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
