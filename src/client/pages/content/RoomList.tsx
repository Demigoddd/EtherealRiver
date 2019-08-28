import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import { Popover, Avatar, Button, Menu, Divider, Icon, Modal } from 'antd';
import { result } from 'lodash-es';
import ScrollArea from 'react-scrollbar';

import { fetchUserLogout } from '../../utils/state/actions/index';
import RoomMenuItem from './roomList/RoomMenuItem';
import AddRoomController from './roomList/AddRoomController';

const RoomOne = [{ id: 1, name: 'Room 1', type: 'public' }, { id: 2, name: 'Room 2', type: 'public' }];

const RoomList: React.FC<any> = ({ user }) => {
  const delay: number = 100;
  const ScrollAreaRef = useRef<any>();
  const [visible, setVisible] = useState(false);

  const onSubMenuChange = () => {
    setTimeout(() => {
      result(ScrollAreaRef, 'current.scrollArea.refresh');
    }, (delay + 100));
  };

  const roomSelected = (event: any) => {
    console.log('click ', event);
  };

  const profileContent = (
    <Menu className="rooms--menu">
      <Menu.Item>
        <Link to={`/profile/${user._id}`}>Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/" onClick={fetchUserLogout}>Logout</Link>
      </Menu.Item>
    </Menu>
  );

  const addRoomModal = (
    <Modal
      title="Add New Room"
      visible={visible}
      onCancel={() => setVisible(!visible)}
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
            <Avatar size="large" icon="user" />
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
      <ScrollArea
        ref={ScrollAreaRef}
        speed={0.8}
        horizontal={false}
      >
        <Menu
          className="rooms--menu"
          mode="inline"
          onClick={(event) => roomSelected(event)}
          onOpenChange={() => onSubMenuChange()}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['Private Rooms']}
          subMenuOpenDelay={delay}
          subMenuCloseDelay={delay}
        >
          <RoomMenuItem title="Public Rooms" icon="wechat" rooms={RoomOne}></RoomMenuItem>
          <RoomMenuItem title="Private Rooms" icon="unlock" rooms={[]}></RoomMenuItem>
          <RoomMenuItem title="Personal Rooms" icon="user" rooms={[]}></RoomMenuItem>
        </Menu>
      </ScrollArea>
      {addRoomModal}
    </div >
  );
};

export default RoomList;
