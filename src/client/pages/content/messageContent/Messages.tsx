import React, { useRef, useEffect, useState } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { Empty, Modal } from "antd";
import { get, isEmpty } from "lodash-es";
import ScrollArea from 'react-scrollbar';
import Message from './messages/Message';
import { MessageAction } from '../../../utils/state/actions';
import rootSocket from '../../../utils/socket';
import Loading from "../../../components/Loading";

const Messages: React.FC<any> = ({
  user,
  items,
  currentRoomId,
  messageLoading,
  fetchMessages,
  addMessage,
  updateMessage,
  removeMessage,
  removeMessageById,
  setMessageEditMode,
  fetchUpdateEmotion
}) => {
  const [previewImage, setPreviewImage] = useState<any>(null);
  const ScrollAreaRef = useRef<any>();

  const onNewMessage = (data: any) => {
    addMessage(data);

    if (ScrollAreaRef.current && isMe(data.user._id)) {
      ScrollAreaRef.current.scrollArea.scrollYTo(9999999);
    }
  };

  const onUpdateMessage = (data: any) => {
    updateMessage(data);
  };

  const onRemoveMessage = (data: any) => {
    removeMessage(data._id);
  }

  const isMe = (messageUserId: any) => {
    return get(user, '_id') === messageUserId;
  };

  useEffect((): any => {
    if (currentRoomId) {
      fetchMessages(currentRoomId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRoomId]);

  useEffect((): any => {
    rootSocket.on("NewMessage", onNewMessage);
    rootSocket.on("UpdateMessage", onUpdateMessage);
    rootSocket.on("RemoveMessage", onRemoveMessage);

    return () => {
      rootSocket.off("NewMessage", onNewMessage);
      rootSocket.off("UpdateMessage", onUpdateMessage);
      rootSocket.off("RemoveMessage", onRemoveMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollArea
      className={classNames("messages", {
        "messages--content-center": (messageLoading || isEmpty(items))
      })}
      ref={ScrollAreaRef}
      speed={0.8}
      horizontal={false}
      smoothScrolling={true}
    >
      {
        messageLoading ? (
          <div className="messages--loading">
            <Loading tip="Loading Messages..." />
          </div>
        ) : isEmpty(items) ? (
          <Empty description="Messages is Empty" />
        ) : (
              items.map((item: any) => (
                <Message
                  key={item._id}
                  message={item}
                  isMe={isMe(item.user._id)}
                  currentUserId={user._id}
                  onRemoveMessage={removeMessageById}
                  setMessageEditMode={setMessageEditMode}
                  fetchUpdateEmotion={fetchUpdateEmotion}
                  setPreviewImage={setPreviewImage}
                />
              ))
            )
      }
      <Modal
        visible={!!previewImage}
        onCancel={() => setPreviewImage(null)}
        footer={null}
      >
        <img src={previewImage} style={{ width: "100%" }} alt="Preview" />
      </Modal>
    </ScrollArea>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user.data,
  items: state.message.items,
  currentRoomId: state.rooms.currentRoom._id,
  messageLoading: state.message.messageLoading
});

export default connect(mapStateToProps, MessageAction)(Messages);
