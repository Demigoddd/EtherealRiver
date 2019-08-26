import React from 'react';
import { Card } from 'antd';
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

export const UserList: React.FC = () => {
  return (
    <Card title={`Users: ${users.length}`} className="users">
      <ScrollArea
        speed={0.8}
        horizontal={false}
      >
        {users.map((user: any) => <UserItem key={user.id} user={user} />)}
      </ScrollArea>
    </Card>
  );
};
