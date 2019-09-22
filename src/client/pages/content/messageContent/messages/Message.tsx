import React, { useState } from "react";
import classNames from "classnames";
import { Comment, Tooltip, Avatar, Divider, Popconfirm, Typography, Checkbox, Button, Modal } from "antd";
import { Picker, Emoji } from "emoji-mart";
import moment from 'moment';
import Time from "../../../../components/Time";

const Message: React.FC<any> = ({
  message,
  isMe,
  currentUserId,
  onRemoveMessage,
  setMessageEditMode,
  fetchUpdateEmotion
}) => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [deleteForAll, setDeleteForAll] = useState(false);

  const emotionHandler = (e?: any, type?: any) => {
    console.log("asd")
    const emojiType = (e && e.id) || type;
    fetchUpdateEmotion({ type: emojiType, messageId: message._id });
  };

  const editMessage = () => {
    setMessageEditMode({ isEditMode: true, editMessageId: message._id, editMessageText: message.text });
  };

  const deleteMessage = () => {
    onRemoveMessage(message._id, deleteForAll);
  };

  const actions = [
    <>
      {
        isMe
          ? <span onClick={editMessage}>Edit</span>
          : <></>
      }
    </>,
    <>
      {
        isMe
          ? <Popconfirm
            title={
              <div className="messages--delete-content">
                <div>Are you sure delete this message?</div>
                <div><Checkbox value={deleteForAll} onChange={(event: any) => setDeleteForAll(event.target.checked)}>Delete for all users.</Checkbox></div>
              </div>
            }
            onConfirm={deleteMessage}
            okText="Yes"
            cancelText="No"
          >
            Delete
          </Popconfirm>
          : <></>
      }
    </>,
    <Divider className="messages--action-divider" type="vertical" />,
    <Tooltip title="Like">
      <Button
        className="messages--action-emoji"
        onClick={() => emotionHandler(null, "like")}
        type={message.emotions.likes.includes(currentUserId) ? "primary" : "default"}
        shape="round"
      >
        <Emoji key="like" emoji="+1" set='apple' size={16} />
        <span>{message.emotions.likes.length}</span>
      </Button>
    </Tooltip>,
    <Tooltip title="Dislike">
      <Button
        className="messages--action-emoji"
        onClick={() => emotionHandler(null, "dislike")}
        type={message.emotions.dislikes.includes(currentUserId) ? "primary" : "default"}
        shape="round"
      >
        <Emoji key="dislike" emoji="-1" set='apple' size={16} />
        <span>{message.emotions.dislikes.length}</span>
      </Button>
    </Tooltip>,
    <Divider className="messages--action-divider" type="vertical" />,
    <Button onClick={() => setOpenEmoji(!openEmoji)} type="link" icon="smile" shape="circle" />,
    <Modal
      title="Pick Emoji"
      width={330}
      visible={openEmoji}
      onCancel={() => setOpenEmoji(!openEmoji)}
      footer={null}
    >
      <Picker
        onSelect={(event: any) => emotionHandler(event)}
        set="apple"
        perLine={7}
        showPreview={false}
        showSkinTones={false}
      />
    </Modal>,
    <Divider className="messages--action-divider" type="vertical" />,
    <div className="messages--action-emoji-row">
      {
        message.emotions.others.map((item: any, index: any) => (
          <Button
            key={index}
            className="messages--action-emoji"
            onClick={() => emotionHandler(null, item.emotion)}
            type={item.users.includes(currentUserId) ? "primary" : "default"}
            shape="round"
          >
            <Emoji key={item._id} emoji={item.emotion} set='apple' size={16} />
            <span>{item.users.length}</span>
          </Button>
        ))
      }
    </div>
  ];

  return (
    <Comment
      className={classNames("messages--box", {
        "messages--isme": isMe
      })}
      actions={actions}
      author={<Typography.Text type={isMe ? "warning" : "secondary"}>{message.user.fullname}</Typography.Text>}
      avatar={<Avatar icon="user" src={message.user.avatar} />}
      content={<p>{message.text}</p>}
      datetime={<Tooltip title={moment(message.createdAt).format('YYYY-MM-DD HH:mm:ss')}><div><Time date={message.createdAt} /></div></Tooltip>}
    />
  );
};

export default Message;
