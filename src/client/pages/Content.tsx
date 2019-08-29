import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserData, fetchRoomData } from '../utils/state/actions/index';

import RoomList from './content/RoomList';
import MessageContent from './content/MessageContent';
import UserList from './content/UserList';

const Content: React.FC<any> = ({ user, room, fetchUserData, fetchRoomData }) => {
  useEffect(() => {
    fetchUserData();
    fetchRoomData();
  }, [fetchUserData, fetchRoomData]);

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
  fetchRoomData
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
