import React, { useState } from 'react';
import { Popconfirm, Divider, Button, Typography } from 'antd';

const MessageHeader: React.FC<any> = () => {
  const [title, setTitle] = useState('Room Title');

  const confirmDeleteRomm = () => {
    console.log("Removed");
  }

  return (
    <>
      <div className="message-content__header">
        <Typography.Paragraph
          className="message-content__header--title"
          editable={{ onChange: (newTitle) => setTitle(newTitle) }}
        >
          {title}
        </Typography.Paragraph>
        <Popconfirm
          title="Are you sure delete this Room ?"
          placement="leftTop"
          onConfirm={confirmDeleteRomm}
          okText="Yes"
          cancelText="No"
        >
          <Button size="small" shape="circle" icon="delete" />
        </Popconfirm>
      </div>
      <Divider />
    </>
  );
};

export default MessageHeader;