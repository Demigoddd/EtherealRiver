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

  const joinHandle = (data: any) => {
    if (data.status === 'success') {
      setCurrentRoom(data.room);
    } else {
      openNotification({
        title: "Error.",
        text: "Error when join the room.",
        type: "error"
      });
    }
  };

  const setRoom = (data: any) => {
    console.log("SetRoom", data.room)
    if (data.status === 'success') {
      setCurrentRoom(data.room);
    } else {
      openNotification({
        title: "Error.",
        text: "Error when finding the room.",
        type: "error"
      });
    }
  };

  useEffect((): any => {
    fetchUserData();
    fetchAllRoom();

    roomsSocket.on("UpdateRoomsList", ({ status }: any) => fetchAllRoom(status));
    roomsSocket.on("SetCurrentRoom", (data: any) => setRoom(data));
    roomsSocket.on("JoinHandle", (data: any) => joinHandle(data));
    return () => roomsSocket.removeListener("UpdateRoomsList", fetchAllRoom);
  }, [fetchUserData, fetchAllRoom]);

  return (
    <div className="content">
      <div className="content__container">
        <RoomList user={user} rooms={rooms} />
        <MessageContent user={user} currentRoom={currentRoom} />
        <UserList user={user} currentRoom={currentRoom} />
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
