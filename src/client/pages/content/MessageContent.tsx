import React from 'react';
import { isEmpty } from 'lodash-es';
import Messages from './messageContent/Messages';
import ChatInput from './messageContent/ChatInput';
import MessageHeader from './messageContent/Header';
import JoinRoom from './messageContent/JoinRoom';

const MessageContent: React.FC<any> = ({ currentRoom, userId }) => {
  const userExistInRoom = (currentRoom.users || []).some((u: any) => u._id === userId);

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
                : <JoinRoom />
            }
          </>
      }
    </div>
  );
};

export default MessageContent;
