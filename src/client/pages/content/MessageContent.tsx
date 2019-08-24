import React from 'react';
import Messages from './messageContent/Messages';
import ChatInput from './messageContent/ChatInput';

export const MessageContent: React.FC = () => {
  return (
    <div className="message-content">
      <Messages />
      <ChatInput />
    </div>
  );
};
