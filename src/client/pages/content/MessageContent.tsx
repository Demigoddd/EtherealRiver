import React from 'react';
import { isEmpty } from 'lodash-es';
import Messages from './messageContent/Messages';
import ChatInput from './messageContent/ChatInput';
import MessageHeader from './messageContent/Header';
import { roomsSocket } from '../../utils/socket';
import JoinRoom from './messageContent/JoinRoom';

const MessageContent: React.FC<any> = ({ user, currentRoom }) => {
  const userExistInRoom = currentRoom.users.some((u: any) => u._id === user._id);

  const joinRoomCallback = () => {
    roomsSocket.emit("Join", null, currentRoom._id, user._id);
  };

  return (
    <div className="message-content">
      {
        isEmpty(currentRoom)
          ? <p className="message-content--empty">Ethereal River</p>
          : <>
            {
              userExistInRoom
                ? <>
                  <MessageHeader />
                  <Messages />
                  <ChatInput />
                </>
                : <JoinRoom joinRoomCallback={joinRoomCallback} roomTitle={currentRoom.name} />
            }
          </>
      }

    </div>
  );
};

export default MessageContent;
