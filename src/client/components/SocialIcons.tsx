import React from 'react';
import { Divider } from 'antd';
import { ReactComponent as GoogleIcon } from '../assets/images/socialIcons/google.svg';
import { ReactComponent as FacebookIcon } from '../assets/images/socialIcons/facebook.svg';

import userApi from "../utils/api/user";

const SocialIcons: React.FC<any> = (props) => {
  const loginGoogle = () => {
    userApi.googleAuth()
      .then((respone: any) => {
        console.log(respone);
      })
      .catch((error: any) => {
        console.log(error);
      })
  };

  const loginFacebook = () => {
    console.log('Facbook');
  };

  return (
    <React.Fragment>
      <Divider />
      <div className="social-icons">
        <div className="social-icons__column">
          <GoogleIcon className="social-icons--google" onClick={loginGoogle} />
        </div>
        <div className="social-icons__column">
          <FacebookIcon className="social-icons--facebook" onClick={loginFacebook} />
        </div>
      </div>
      <Divider />
    </React.Fragment>
  );
};

export default SocialIcons;
