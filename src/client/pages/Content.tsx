import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserData } from '../utils/state/actions/index';

import RoomList from './content/RoomList';
import MessageContent from './content/MessageContent';
import UserList from './content/UserList';

const Content: React.FC = (props: any) => {
  useEffect(() => {
    props.fetchUserData();
  }, [props]);

  return (
    <div className="content">
      <div className="content__container">
        <RoomList />
        <MessageContent />
        <UserList />
      </div>
    </div>
  );
};

export default connect(null, { fetchUserData })(Content);
