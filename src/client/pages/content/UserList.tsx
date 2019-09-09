import React from 'react';
import { isEmpty} from 'lodash-es';
import { Card } from 'antd';
import UserItem from './userList/UserItem';
import ScrollArea from 'react-scrollbar';

const isLoading = false;

const UserList: React.FC<any> = ({ userId, currentRoomId, roomUsers, isUserRoomAdmin }) => {
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
              <ScrollArea
                speed={0.8}
                horizontal={false}
              >
                {
                  roomUsers.map((user: any) => {
                    <UserItem
                      key={user._id}
                      user={user}
                      isUserRoomAdmin={isUserRoomAdmin}
                      isLoading={isLoading}
                    />
                  })
                }
              </ScrollArea>
            </Card>
      }
    </>
  );
};

export default UserList;
