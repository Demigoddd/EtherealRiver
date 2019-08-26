import React from 'react';
import Messages from './messageContent/Messages';
import ChatInput from './messageContent/ChatInput';
import MessageHeader from './messageContent/Header';

const MessageContent: React.FC = () => {
  return (
    <div className="message-content">
      <MessageHeader />
      <Messages />
      <ChatInput />
    </div>
  );
};

export default MessageContent;
