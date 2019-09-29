import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Popover, Avatar, Button, Menu, Icon, Modal } from 'antd';
import { isEmpty } from 'lodash-es';

import { UserAction } from '../../utils/state/actions';
import Loading from '../../components/Loading';
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
      destroyOnClose={true}
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
            {
              isEmpty(user)
                ? <Loading />
                : <>
                  <Avatar size="large" icon="user" src={user.avatar} />
                  <div>
                    <p><strong>{user.fullname}</strong></p>
                    <p>{user.email}</p>
                  </div>
                </>
            }
          </Button>
        </Popover>
        <div className="rooms__header__divider">
          <span className="rooms__header__divider--title">Rooms</span>
          <Icon className="rooms__header__divider--add-icon" type="plus-circle" onClick={() => setVisible(!visible)} />
        </div>
      </div>
      <RoomsList />
      {addRoomModal}
    </div >
  );
};

export default Sidebar;
