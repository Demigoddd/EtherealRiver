import React, { useState } from "react";
import classNames from "classnames";
import { Comment, Tooltip, Avatar, Divider, Popconfirm, Typography, Checkbox, Button, Modal, Icon, Badge } from "antd";
import { Picker, Emoji } from "emoji-mart";
import { isEmpty } from "lodash-es";
import moment from 'moment';
import Time from "../../../../components/Time";

const Message: React.FC<any> = ({
  message,
  isMe,
  currentUserId,
  onRemoveMessage,
  setMessageEditMode,
  fetchUpdateEmotion,
  setPreviewImage
}) => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [deleteForAll, setDeleteForAll] = useState(false);

  const emotionHandler = (e?: any, type?: any) => {
    const emojiType = (e && e.id) || type;
    fetchUpdateEmotion({ type: emojiType, messageId: message._id });
  };

  const editMessage = () => {
    const attachments: any[] = message.attachments.map((item: any) => {
      return {
        status: "done",
        uid: item._id,
        name: item.filename,
        url: item.url,
        public_id: item.public_id
      };
    });

    setMessageEditMode({
      isEditMode: true,
      editMessageId: message._id,
      editMessageText: message.text,
      editMessageAttachments: attachments
    });
  };

  const deleteMessage = () => {
    onRemoveMessage(message._id, deleteForAll);
  };

  const renderAttachment = (item: any) => {
    return (
      <div
        key={item._id}
        onClick={() => setPreviewImage(item.url)}
        className="messages--attachments-item"
      >
        <div className="messages--attachments-item-overlay">
          <Icon type="eye" style={{ color: "white", fontSize: 18 }} />
        </div>

        <img src={item.url} alt={item.filename} />
      </div>
    );
  };

  const actions = [
    <div className="messages__main-action">
      {
        isMe
          ? <div className="messages__main-action--text">
            <div>
              <span onClick={editMessage}>Edit</span>
            </div>
            <div>
              <Popconfirm
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
            </div>
            <Divider className="messages--action-divider" type="vertical" />
          </div>
          : <></>
      }
      <div className="messages__emoji--content">
        <Badge
          style={{ backgroundColor: message.emotions.likes.includes(currentUserId) ? "dodgerblue" : "lightsteelblue" }}
          count={message.emotions.likes.length}
          overflowCount={99999}
        >
          <Icon
            onClick={() => emotionHandler(null, "like")}
            type="like"
            theme={message.emotions.likes.includes(currentUserId) ? "twoTone" : "outlined"}
            style={{ fontSize: 20 }}
          />
        </Badge>
        <Badge
          style={{ backgroundColor: message.emotions.dislikes.includes(currentUserId) ? "dodgerblue" : "lightsteelblue" }}
          count={message.emotions.dislikes.length}
          overflowCount={99999}
        >
          <Icon
            onClick={() => emotionHandler(null, "dislike")}
            theme={message.emotions.dislikes.includes(currentUserId) ? "twoTone" : "outlined"}
            type="dislike"
            style={{ fontSize: 20 }}
          />
        </Badge>
        <Divider className="messages--action-divider" type="vertical" />
      </div>
    </div>,
    <div className="messages__emoji">
      <div>
        <Button onClick={() => setOpenEmoji(!openEmoji)} type="link" icon="smile" shape="circle" />
        <Modal
          title="Pick Emoji"
          width={330}
          visible={openEmoji}
          onCancel={() => setOpenEmoji(!openEmoji)}
          footer={null}
        >
          <Picker
            onSelect={(event: any) => emotionHandler(event)}
            perLine={7}
            showPreview={false}
            showSkinTones={false}
          />
        </Modal>
      </div>
      <Divider className="messages--action-divider" type="vertical" />
      <div className="messages__emoji--row">
        {
          message.emotions.others.map((item: any, index: any) => (
            <div key={index} className="messages__emoji--content">
              <Badge
                style={{ backgroundColor: item.users.includes(currentUserId) ? "dodgerblue" : "lightsteelblue" }}
                count={item.users.length}
                overflowCount={99999}
              >
                <Emoji key={item._id} onClick={() => emotionHandler(null, item.emotion)} emoji={item.emotion} size={18} />
              </Badge>
            </div>
          ))
        }
      </div>
    </div>
  ];

  return (
    <Comment
      className={classNames("messages__default", {
        "messages__isme": isMe
      })}
      actions={actions}
      author={<Typography.Text className="messages--author-name" type={isMe ? "warning" : "secondary"}>{message.user.fullname}</Typography.Text>}
      avatar={<Avatar icon="user" src={message.user.avatar} />}
      content={
        <div className="messages--text">
          <p>{message.text}</p>
          {!isEmpty(message.attachments) && (
            <>
              <Divider type="vertical" />
              <div className="messages--attachments">
                {message.attachments.map((item: any) => renderAttachment(item))}
              </div>
            </>
          )}
        </div>
      }
      datetime={<Tooltip title={moment(message.createdAt).format('YYYY-MM-DD HH:mm:ss')}><div><Time date={message.createdAt} /></div></Tooltip>}
    />
  );
};

export default Message;
