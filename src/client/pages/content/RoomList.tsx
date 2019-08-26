import React, { useRef, } from 'react';
import { Link } from 'react-router-dom'
import { Popover, Avatar, Button, Menu, Divider } from 'antd';
import { result } from 'lodash-es';
import RoomMenuItem from './roomList/RoomMenuItem';
import ScrollArea from 'react-scrollbar';

const RoomOne = [{ id: 1, name: 'Room 1' }, { id: 2, name: 'Room 2' }];

const RoomList: React.FC<any> = () => {
  const delay: number = 100;
  const ScrollAreaRef = useRef<any>();

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
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/setting">Setting</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/logout">Logout</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="rooms">
      <div className="rooms__header">
        <Popover placement="bottom" title="Menu" trigger="click" content={profileContent}>
          <Button className="rooms__avatar">
            <Avatar size="large" icon="user" />
            <div>
              <p><strong>Username</strong></p>
              <p>Email</p>
            </div>
          </Button>
        </Popover>
      </div>
      <Divider orientation="left">Rooms</Divider>
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
    </div >
  );
};

export default RoomList;
