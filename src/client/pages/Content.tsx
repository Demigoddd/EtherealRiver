import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserData } from '../utils/state/actions/index';

import RoomList from './content/RoomList';
import MessageContent from './content/MessageContent';
import UserList from './content/UserList';

const Content: React.FC<any> = ({ user, fetchUserData }) => {
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <div className="content">
      <div className="content__container">
        <RoomList user={user}/>
        <MessageContent />
        <UserList />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user.data
});

const mapDispatchToProps = {
  fetchUserData
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
