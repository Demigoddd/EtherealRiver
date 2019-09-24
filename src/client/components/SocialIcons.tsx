import React from "react";
import { Divider } from "antd";
import SocialLogin from "./SocialLogin";

import store from "../utils/state/store";
import { UserAction } from "../utils/state/actions";
import { openNotification } from "../utils/helpers/openNotification";

const SocialIcons: React.FC<any> = (props: any) => {

  const handleGoogleLogin = (user: any) => {
    const postData = {
      email: user._profile.email,
      socialId: user._profile.id,
      fullname: user._profile.name,
      avatar: user._profile.profilePicURL
    };

    store.dispatch(UserAction.fetchUserRegister(postData))
      .then((response: any) => {
        store.dispatch(UserAction.fetchUserLogin(postData));
      });
  };

  const handleGoogleLoginFailure = (err: any) => {
    console.log("Google Auth Error: ", err);
    // openNotification({
    //   title: "Authorization Error.",
    //   text: "Google Auth Error.",
    //   type: "error"
    // });
  };

  const handleFacebookLogin = (user: any) => {
    const postData = {
      email: user._profile.email,
      socialId: user._profile.id,
      fullname: user._profile.name,
      avatar: user._profile.profilePicURL
    };

    store.dispatch(UserAction.fetchUserRegister(postData))
      .then((response: any) => {
        store.dispatch(UserAction.fetchUserLogin(postData));
      });
  };

  const handleFacebookLoginFailure = (err: any) => {
    console.log("Facebook Auth Error: ", err);
    // openNotification({
    //   title: "Authorization Error.",
    //   text: "Facebook Auth Error.",
    //   type: "error"
    // });
  };

  return (
    <React.Fragment>
      <Divider />
      <div className="social-icons">
        <div className="social-icons__column">
          <SocialLogin
            className="social-icons--google"
            type="google"
            provider="google"
            appId="91060208258-vu7ji6pjn39ge5c6c3lpup2d8o7og2un.apps.googleusercontent.com"
            onLoginSuccess={handleGoogleLogin}
            onLoginFailure={handleGoogleLoginFailure}
          >
            Login with Google
          </SocialLogin>
        </div>
        <div className="social-icons__column">
          <SocialLogin
            className="social-icons--facebook"
            type="facebook"
            provider="facebook"
            appId="2354301384840712"
            onLoginSuccess={handleFacebookLogin}
            onLoginFailure={handleFacebookLoginFailure}
          >
            Login with Facebook
          </SocialLogin>
        </div>
      </div>
      <Divider />
    </React.Fragment>
  );
};

export default SocialIcons;
