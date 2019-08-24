import React from "react";
import { Icon, Divider } from "antd";

const SocialIcons: React.FC<any> = (props) => {
  const loginGoogle = () => {
    console.log('Google');
  };

  const loginFacebook = () => {
    console.log('Facbook');
  };

  return (
    <React.Fragment>
      <Divider />
      <div className="social-icons">
        <div className="social-icons__column">
          <Icon className="social-icons--google" type="google" onClick={loginGoogle} />
        </div>
        <div className="social-icons__column">
          <Icon className="social-icons--facebook" type="facebook" onClick={loginFacebook} />
        </div>
      </div>
      <Divider />
    </React.Fragment>
  );
};

export default SocialIcons;
