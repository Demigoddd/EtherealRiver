import React from 'react';
import { isEmpty } from 'lodash-es';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { RoomAction } from '../../utils/state/actions';
import UserItem from './userList/UserItem';
import Loading from "../../components/Loading";
import ScrollArea from 'react-scrollbar';

const UserList: React.FC<any> = ({
  userId,
  currentRoomId,
  roomUsers,
  roomLoading,
  isUserRoomAdmin,
  fetchRemoveUserFromRoom
}) => {
  const cardHeader = (
    <div className="users--header">
      <span className="user-header--title">Users: {roomUsers.length}</span>
    </div>
  );

  return (
    <>
      {
        isEmpty(currentRoomId)
          ? <></>
          : <Card title={isEmpty(roomUsers) ? <></> : cardHeader} className="users">
            {
              roomLoading
                ? <Loading className="users--loading" tip="Loading Users..." />
                : <ScrollArea
                  speed={0.8}
                  horizontal={false}
                >
                  {
                    roomUsers.map((user: any) =>
                      <UserItem
                        key={user._id}
                        user={user}
                        currentUserId={userId}
                        currentRoomId={currentRoomId}
                        isAdmin={user._id === userId}
                        isUserRoomAdmin={isUserRoomAdmin}
                        fetchRemoveUserFromRoom={fetchRemoveUserFromRoom}
                      />
                    )
                  }
                </ScrollArea>
            }
          </Card>
      }
    </>
  );
};


const mapStateToProps = (state: any) => ({
  userId: state.user.data._id,
  currentRoomId: state.rooms.currentRoom._id,
  roomUsers: (state.rooms.currentRoom.users || []),
  roomLoading: state.rooms.roomLoading,
  isUserRoomAdmin: (state.rooms.currentRoom.authors || []).includes(state.user.data._id)
});

export default connect(mapStateToProps, RoomAction)(UserList);
