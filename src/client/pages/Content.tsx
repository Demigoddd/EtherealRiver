import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserData, fetchAllRoom } from '../utils/state/actions/index';
import socket from '../utils/socket';

import RoomList from './content/RoomList';
import MessageContent from './content/MessageContent';
import UserList from './content/UserList';

const Content: React.FC<any> = ({ user, room, fetchUserData, fetchAllRoom }) => {
  useEffect(() => {
    fetchUserData();
    fetchAllRoom();

    socket.on("OOMS:UpdateRoomsList", onNewMessage);
  }, [fetchUserData, fetchAllRoom]);

  return (
    <div className="content">
      <div className="content__container">
        <RoomList user={user} room={room} />
        <MessageContent />
        <UserList />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user.data,
  room: state.room
});

const mapDispatchToProps = {
  fetchUserData,
  fetchAllRoom
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
