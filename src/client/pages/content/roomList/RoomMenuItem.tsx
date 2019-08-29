import React from "react";
import { Menu, Icon, Empty } from 'antd';

interface RoomMenuItem {
  title: string;
  icon: string;
  rooms: any;
}

const RoomMenuItem: React.FC<RoomMenuItem> = ({ title, icon, rooms, ...other }) => {
  return (
    <Menu.SubMenu
      {...other}
      key={title}
      title={
        <span>
          <Icon type={icon} />{title}
        </span>
      }
    >
      {
        rooms.length
          ? rooms.map((room: any) => <Menu.Item key={room._id}>{room.name}</Menu.Item>)
          : <> <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> </>
      }
    </Menu.SubMenu>
  );
};

export default RoomMenuItem;
