import React from 'react';
import { Link } from 'react-router-dom'
import { Popover, Avatar, Menu, Typography, Badge, Card, Skeleton, Button } from 'antd';

const UserItem: React.FC<any> = ({ user, isUserRoomAdmin, isLoading }) => {
  const removeUser = () => {
    console.log("Remove user from Room");
  };

  const userMenuContent = (
    <Menu>
      <Menu.Item>
        <Link to={`/profile/${user._id}`}>View Profile</Link>
      </Menu.Item>
      {
        isUserRoomAdmin
          &&  <Menu.Item>
                <Button type="link" onClick={removeUser}>Remove From Room</Button>
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
