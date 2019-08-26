import React from 'react';

import RoomList from './content/RoomList';
import { MessageContent } from './content/MessageContent';
import { UserList } from './content/UserList';

const Content: React.FC = () => {
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

export default Content;
