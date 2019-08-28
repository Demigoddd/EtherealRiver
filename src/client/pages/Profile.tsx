import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Button, Divider, Avatar, Descriptions } from 'antd';
import { fetchUserDataById } from '../utils/state/actions/index';

const Profile: React.FC<any> = ({ match, history }: any) => {
  const [user, setUser]: any = useState({});

  useEffect(() => {
    fetchUserDataById(match.params.id)
      .then((data) => {
        setUser(data);
      });
  }, [match]);

  return (
    <div className="profile">
      <div className="profile__container">
        <div className="profile__container--header">
          <span>Profile</span>
          <Button shape="circle" icon="close" onClick={() => history.push('/')} />
        </div>
        <Divider />
        <div className="profile__container--content">
          <Avatar shape="square" size={300} icon="user" />
          <Descriptions bordered title="User Info" column={1}>
            <Descriptions.Item label="UserName">{user.email}</Descriptions.Item>
            <Descriptions.Item label="Email">{user.fullname}</Descriptions.Item>
            <Descriptions.Item label="isOnline">{user.isOnline ? 'Yes' : 'No'}</Descriptions.Item>
            <Descriptions.Item label="AccountCreated">{moment(user.createdAt).format("DD-MM-YYYY")}</Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Profile);
