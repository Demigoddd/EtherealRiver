import React from 'react';
import { Link } from 'react-router-dom'
import { Popover, Avatar, Menu, Typography, Badge, Card } from 'antd';

const UserItem: React.FC<any> = ({ user, currentUserId, currentRoomId, isAdmin, isUserRoomAdmin, fetchRemoveUserFromRoom }) => {
  const removeUser = (event: any) => {
    event.preventDefault();
    fetchRemoveUserFromRoom({ currentRoomId: currentRoomId, adminId: currentUserId, userId: user._id });
  };

  const userMenuContent = (
    <Menu>
      <Menu.Item>
        <Link to={`/profile/${user._id}`}>View Profile</Link>
      </Menu.Item>
      {
        (isUserRoomAdmin && !isAdmin)
        && <Menu.Item>
          <Link to="/" onClick={removeUser}>Remove From Room</Link>
        </Menu.Item>
      }
    </Menu>
  );

  return (
    <Popover placement="bottom" title="User Menu" trigger="click" content={userMenuContent}>
      <Card.Grid>
        <Badge dot status={user.isOnline ? 'success' : 'default'}>
          <Avatar size="large" icon="user" src={user.avatar} />
        </Badge>
        <Typography.Text type="secondary" strong className="users--name">{user.fullname}</Typography.Text>
      </Card.Grid>
    </Popover>
  );
};

export default UserItem;
