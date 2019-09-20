import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { UserAction, RoomAction } from '../utils/state/actions';
import rootSocket from '../utils/socket';

import Sidebar from './content/Sidebar';
import MessageContent from './content/MessageContent';
import UserList from './content/UserList';

const Content: React.FC<any> = ({
  user,
  currentRoom,
  fetchUserData,
  fetchAllRoom,
  setCurrentRoom
}) => {
  useEffect((): any => {
    fetchUserData();
    fetchAllRoom();

    const UpdateCurrentRoomHandler = ({ room }: any) => { setCurrentRoom(room) };
    rootSocket.on("UpdateCurrentRoom", UpdateCurrentRoomHandler);
    const UpdateRoomsListHandler = ({ status }: any) => { fetchAllRoom() };
    rootSocket.on("UpdateRoomsList", UpdateRoomsListHandler);

    return () => {
      rootSocket.off("UpdateRoomsList", UpdateRoomsListHandler);
      rootSocket.off("UpdateCurrentRoom", UpdateCurrentRoomHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="content">
      <div className="content__container">
        <Sidebar user={user} />
        <MessageContent currentRoom={currentRoom} userId={user._id} />
        <UserList />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user.data,
  currentRoom: state.rooms.currentRoom,
});

const mapDispatchToProps = {
  ...UserAction,
  ...RoomAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
