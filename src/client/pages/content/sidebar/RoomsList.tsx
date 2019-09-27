import React, { useRef } from "react";
import { connect } from "react-redux";
import { isEmpty, result } from "lodash-es"
import { Menu, Icon, Empty } from "antd";
import ScrollArea from "react-scrollbar";
import { RoomAction } from "../../../utils/state/actions";
import Loading from "../../../components/Loading";

const RoomsList: React.FC<any> = ({
  userId,
  rooms,
  currentRoomId,
  roomLoading,
  fetchFindRoomById
}) => {
  const delay: number = 100;
  const ScrollAreaRef = useRef<any>();

  const onSubMenuChange = () => {
    setTimeout(() => {
      result(ScrollAreaRef, 'current.scrollArea.refresh');
    }, (delay + 100));
  };

  return (
    <>
      {
        isEmpty(rooms) && roomLoading
          ? <Loading className="rooms--loading" tip="Loading Rooms..." />
          : <ScrollArea
            ref={ScrollAreaRef}
            speed={0.8}
            horizontal={false}
          >
            <Menu
              className="rooms--menu"
              mode="inline"
              onClick={(event) => fetchFindRoomById(event.key, userId)}
              onOpenChange={() => onSubMenuChange()}
              subMenuOpenDelay={delay}
              subMenuCloseDelay={delay}
              selectedKeys={[currentRoomId]}
              defaultOpenKeys={["my", "public", "private"]}
            >
              <Menu.SubMenu
                key="my"
                title={
                  <span>
                    <Icon type="star" />My Rooms
                  </span>
                }
              >
                {
                  rooms.my.length
                    ? rooms.my.map((room: any) => <Menu.Item key={room._id}>{room.name}</Menu.Item>)
                    : <> <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> </>
                }
              </Menu.SubMenu>
              <Menu.SubMenu
                key="public"
                title={
                  <span>
                    <Icon type="wechat" />Public Room
                  </span>
                }
              >
                {
                  rooms.public.length
                    ? rooms.public.map((room: any) => <Menu.Item key={room._id}>{room.name}</Menu.Item>)
                    : <> <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> </>
                }
              </Menu.SubMenu>
              <Menu.SubMenu
                key="private"
                title={
                  <span>
                    <Icon type="unlock" />Private Rooms
                  </span>
                }
              >
                {
                  rooms.private.length
                    ? rooms.private.map((room: any) => <Menu.Item key={room._id}>{room.name}</Menu.Item>)
                    : <> <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> </>
                }
              </Menu.SubMenu>
            </Menu>
          </ScrollArea>
      }
    </>
  );
};

const mapStateToProps = (state: any) => ({
  userId: state.user.data._id,
  rooms: state.rooms,
  currentRoomId: state.rooms.currentRoom._id,
  roomLoading: state.rooms.roomLoading
});

export default connect(mapStateToProps, RoomAction)(RoomsList);
