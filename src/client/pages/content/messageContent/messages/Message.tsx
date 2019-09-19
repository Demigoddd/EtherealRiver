import React from "react";
import classNames from "classnames";
import { Comment, Tooltip, Icon, Avatar, Divider, Popconfirm, Typography } from "antd";

const Message: React.FC<any> = ({
  message,
  isMe,
  onRemoveMessage
}) => {
  const like = () => {
    console.log("like");
  };

  const dislike = () => {
    console.log("dislike");
  };

  const editMessage = () => {
    console.log("edit message");
  };

  const deleteMessage = () => {
    console.log("remove message");
    onRemoveMessage(message._id);
  };

  const actions = [
    <span onClick={editMessage}>Edit</span>,
    <Popconfirm
      title="Are you sure delete this message?"
      onConfirm={deleteMessage}
      okText="Yes"
      cancelText="No"
    >
      Delete
    </Popconfirm>,
    <Divider style={{ marginLeft: 0, marginRight: 8 }} type="vertical" />,
    <span key="comment-like">
      <Tooltip title="Like">
        <Icon
          type="like"
          theme={message.emotions.likes.includes(message.user._id) ? 'filled' : 'outlined'}
          onClick={like}
        />
      </Tooltip>
      <span style={{ paddingLeft: 8, cursor: 'auto' }}>{message.emotions.likes.length}</span>
    </span>,
    <span key="comment-dislike">
      <Tooltip title="Dislike">
        <Icon
          type="dislike"
          theme={message.emotions.dislikes.includes(message.user._id) ? 'filled' : 'outlined'}
          onClick={dislike}
        />
      </Tooltip>
      <span style={{ paddingLeft: 8, cursor: 'auto' }}>{message.emotions.dislikes.length}</span>
    </span>
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
      datetime={<Tooltip title={message.updatedAt}><Typography.Text type="secondary">{message.updatedAt}</Typography.Text></Tooltip>}
    />
  );
};

export default Message;
