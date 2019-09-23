import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Popover, Avatar, Button, Menu, Divider, Icon, Modal } from 'antd';

import { UserAction } from '../../utils/state/actions';
import RoomsList from './sidebar/RoomsList';
import AddRoomController from './sidebar/AddRoomController';

const Sidebar: React.FC<any> = ({ user }) => {
  const [visible, setVisible] = useState(false);

  const profileContent = (
    <Menu className="rooms--menu">
      <Menu.Item>
        <Link to={`/profile/${user._id}`}>Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/" onClick={UserAction.fetchUserLogout}>Logout</Link>
      </Menu.Item>
    </Menu>
  );

  const addRoomModal = (
    <Modal
      title="Add New Room"
      visible={visible}
      onCancel={() => setVisible(!visible)}
      maskClosable={false}
      footer=""
    >
      <AddRoomController />
    </Modal>
  );

  return (
    <div className="rooms">
      <div className="rooms__header">
        <Popover placement="bottom" title="Menu" trigger="click" content={profileContent}>
          <Button className="rooms__avatar">
            <Avatar size="large" icon="user" src={user.avatar} />
            <div>
              <p><strong>{user.fullname}</strong></p>
              <p>{user.email}</p>
            </div>
          </Button>
        </Popover>
      </div>
      <Divider orientation="left">
        <span>Rooms</span>
        <Icon className="rooms--add-icon" type="plus-circle" onClick={() => setVisible(!visible)} />
      </Divider>
      <RoomsList />
      {addRoomModal}
    </div >
  );
};

export default Sidebar;