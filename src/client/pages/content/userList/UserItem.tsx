import React from 'react';
import { Link } from 'react-router-dom'
import { Popover, Avatar, Menu, Typography, Badge, Card, Skeleton } from 'antd';
import { roomsSocket } from '../../../utils/socket';

const UserItem: React.FC<any> = ({ user, currentRoomId, isAdmin, isUserRoomAdmin, isLoading }) => {
  const removeUser = (event: any) => {
    event.preventDefault();
    roomsSocket.emit("Leave", currentRoomId, user._id);
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
    <Skeleton loading={isLoading} avatar paragraph={{ rows: 0 }}>
      <Popover placement="bottom" title="User Menu" trigger="click" content={userMenuContent}>
        <Card.Grid>
          <Badge dot status={user.isOnline ? 'success' : 'default'}>
            <Avatar size="large" icon={user.avatar} />
          </Badge>
          <Typography.Text type="secondary" strong>{user.fullname}</Typography.Text>
        </Card.Grid>
      </Popover>
    </Skeleton>
  );
};

export default UserItem;
