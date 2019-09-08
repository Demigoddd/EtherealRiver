import React, { useState } from 'react';
import { get } from 'lodash-es';
import { Card, Popover, Button, Input, Icon } from 'antd';
import UserItem from './userList/UserItem';
import ScrollArea from 'react-scrollbar';

const UserList: React.FC<any> = ({ user, currentRoom }) => {
  const [username, setUsername] = useState('');
  const roomUsers = get(currentRoom, 'users', []);

  const addUser = (username: string) => {
    console.log(username, "User add");
  };

  const addUserContent = (
    <div className="users__add-user">
      <Input
        placeholder="Enter username"
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        value={username || ''}
        onChange={(e: any) => setUsername(e.target.value)} />
      <Button onClick={() => addUser(username)} type="primary" block>Add user to room</Button>
    </div>
  );

  const cardHeader = (
    <div className="users--header">
      <span className="user-header--title">User: {roomUsers.length}</span>
      <Popover placement="leftTop" title="Add User" content={addUserContent} trigger="click">
        <Button size="small" shape="circle" icon="plus" />
      </Popover>
    </div>
  );

  return (
    <Card title={cardHeader} className="users">
      <ScrollArea
        speed={0.8}
        horizontal={false}
      >
        {get(currentRoom, 'users', []).map((user: any) => <UserItem key={user._id} user={user} />)}
      </ScrollArea>
    </Card>
  );
};

export default UserList;
