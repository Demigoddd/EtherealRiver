import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import { Popover, Avatar, Button, Menu, Divider, Icon, Modal, Spin } from 'antd';
import { isEmpty, result } from 'lodash-es';
import ScrollArea from 'react-scrollbar';
import { roomsSocket } from '../../utils/socket';

import { UserAction } from '../../utils/state/actions';
import RoomMenuItem from './roomList/RoomMenuItem';
import AddRoomController from './roomList/AddRoomController';

const RoomList: React.FC<any> = ({ user, rooms }) => {
  const delay: number = 100;
  const ScrollAreaRef = useRef<any>();
  const [visible, setVisible] = useState(false);

  const onSubMenuChange = () => {
    setTimeout(() => {
      result(ScrollAreaRef, 'current.scrollArea.refresh');
    }, (delay + 100));
  };

  const roomSelected = (event: any) => {
    roomsSocket.emit('Join', event.item.props.children);
  };

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
        {
          isEmpty(rooms)
            ? <Spin size="large" style={{ display: 'flex', justifyContent: 'center' }} />
            : <Menu
              className="rooms--menu"
              mode="inline"
              onClick={(event) => roomSelected(event)}
              onOpenChange={() => onSubMenuChange()}
              subMenuOpenDelay={delay}
              subMenuCloseDelay={delay}
              defaultSelectedKeys={['My Rooms']}
              defaultOpenKeys={['My Rooms']}
            >
              <RoomMenuItem title="My Rooms" icon="star" rooms={rooms.my}></RoomMenuItem>
              <RoomMenuItem title="Personal Rooms" icon="user" rooms={rooms.personal}></RoomMenuItem>
              <RoomMenuItem title="Public Rooms" icon="wechat" rooms={rooms.public}></RoomMenuItem>
              <RoomMenuItem title="Private Rooms" icon="unlock" rooms={rooms.private}></RoomMenuItem>
            </Menu>
        }
      </ScrollArea>
      {addRoomModal}
    </div >
  );
};

export default RoomList;
