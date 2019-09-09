import React from 'react';
import { isEmpty } from 'lodash-es';
import Messages from './messageContent/Messages';
import ChatInput from './messageContent/ChatInput';
import MessageHeader from './messageContent/Header';
import { roomsSocket } from '../../utils/socket';
import JoinRoom from './messageContent/JoinRoom';

const MessageContent: React.FC<any> = ({ userId, currentRoomId, currentRoomName, userExistInRoom, isUserRoomAdmin }) => {
  const joinRoomCallback = () => {
    roomsSocket.emit("Join", null, currentRoomId, userId);
  };

  return (
    <div className="message-content">
      {
        isEmpty(currentRoomId)
          ? <p className="message-content--empty">Ethereal River</p>
          : <>
            {
              userExistInRoom
                ? <>
                  <MessageHeader
                    userId={userId}
                    currentRoomName={currentRoomName}
                    currentRoomId={currentRoomId}
                    isUserRoomAdmin={isUserRoomAdmin}
                  />
                  <Messages />
                  <ChatInput />
                </>
                : <JoinRoom joinRoomCallback={joinRoomCallback} roomTitle={currentRoomName} />
            }
          </>
      }

    </div>
  );
};

export default MessageContent;
