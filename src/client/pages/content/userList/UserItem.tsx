import React from 'react';
import { Link } from 'react-router-dom'
import { Popover, Avatar, Menu, Typography, Badge, Card, Skeleton } from 'antd';

const isLoading = false;

const UserItem: React.FC<any> = ({ user }) => {
  const userMenuContent = (
    <Menu>
      <Menu.Item>
        <Link to="/">View Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/">Remove From Room</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Skeleton loading={isLoading} avatar paragraph={{ rows: 0 }}>
      <Popover placement="bottom" title="User Menu" trigger="click" content={userMenuContent}>
        <Card.Grid>
          <Badge dot status={user.isOnline ? 'success' : 'default'}>
            <Avatar size="large" icon={user.image} />
          </Badge>
          <Typography.Text type="secondary" strong>{user.userName}</Typography.Text>
        </Card.Grid>
      </Popover>
    </Skeleton>
  );
};

export default UserItem;
