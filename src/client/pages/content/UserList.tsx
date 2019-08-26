import React, { useState } from 'react';
import { Card, Popover, Button, Input, Icon } from 'antd';
import UserItem from './userList/UserItem';
import ScrollArea from 'react-scrollbar';

const users = [
  {
    id: 1,
    firstName: 'first',
    lastName: 'last',
    userName: 'Super Username',
    email: 'first@last.com',
    isOnline: true,
    image: 'https://link'
  },
  {
    id: 2,
    firstName: 'username',
    lastName: 'last',
    userName: 'Username',
    email: 'first@last.com',
    isOnline: false,
    image: 'https://link'
  }
]

const UserList: React.FC = () => {
  const [username, setUsername] = useState('');

  const addUser = (username: string) => {
    console.log(username, "User add");
  }

  const addUserContent = (
    <div className="users__add-user">
      <Input
        placeholder="Enter username"
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        value={username || ''}
        onChange={(e: any) => setUsername(e.target.value)}/>
      <Button onClick={() => addUser(username)} type="primary" block>Add user to room</Button>
    </div>
  );

  const cardHeader = (
    <div className="users--header">
      <span className="user-header--title">User: {users.length}</span>
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
        {users.map((user: any) => <UserItem key={user.id} user={user} />)}
      </ScrollArea>
    </Card>
  );
};

export default UserList;
