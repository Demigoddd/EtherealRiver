import React from "react";
import { Comment, Tooltip, Icon, Avatar, Divider, Popconfirm, Typography } from "antd";

const Message: React.FC<any> = ({
  author,
  avatar,
  contet,
  likes,
  dislikes,
  emotions,
  reaction,
  createdAt,
  updatedAt,
  isMe }) => {
  const like = () => {
    likes += 1;
    reaction = 'liked';
  };

  const dislike = () => {
    dislikes += 1;
    reaction = 'liked';
  };

  const editMessage = () => {
    console.log("edit message");
  };

  const confirmDelete = () => {
    console.log("message removed.");
  };

  const actions = [
    <span onClick={editMessage}>Edit</span>,
    <Popconfirm
      title="Are you sure delete this message?"
      onConfirm={confirmDelete}
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
          theme={reaction === 'liked' ? 'filled' : 'outlined'}
          onClick={like}
        />
      </Tooltip>
      <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
    </span>,
    <span key="comment-dislike">
      <Tooltip title="Dislike">
        <Icon
          type="dislike"
          theme={reaction === 'disliked' ? 'filled' : 'outlined'}
          onClick={dislike}
        />
      </Tooltip>
      <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
    </span>
  ];

  return (
    <Comment
      actions={actions}
      author={<Typography.Text type={isMe ? "warning" : "secondary"}>{author}</Typography.Text>}
      avatar={<Avatar src={avatar} />}
      content={<p>{contet}</p>}
      datetime={<Tooltip title={updatedAt}><span>{updatedAt}</span></Tooltip>}
    />
  );
};

export default Message;
