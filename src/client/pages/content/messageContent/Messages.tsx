import React from "react";
import { Empty, Spin } from "antd";
import classNames from "classnames";
import ScrollArea from 'react-scrollbar';
import Message from './messages/Message';

const isLoading = false;

const Messages: React.FC<any> = ({ items, user }) => {
  const onRemoveMessage = () => {
    console.log("Remove Message");
  }

  return (
    <ScrollArea
      speed={0.8}
      horizontal={false}
    >
      <div
        className={classNames("messages", { "messages--loading": isLoading })}
      >
        {isLoading ? (
          <Spin size="large" tip="Loading Messages..." />
        ) : items && !isLoading ? (
          items.length > 0 ? (
            items.map((item: any) => (
              <Message
                key={item._id}
                {...item}
                isMe={user._id === item.user._id}
                onRemoveMessage={onRemoveMessage}
              />
            ))
          ) : (
              <Empty description="Messages is Empty" />
            )
        ) : (
              <Empty description="Open Rooms" />
            )}
      </div>
    </ScrollArea>
  );
};

export default Messages;
