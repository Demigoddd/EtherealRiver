import React from "react";
import { Divider } from "antd";
import SocialLogin from "./SocialLogin";

import { store } from "../utils/state/store";
import { UserAction } from "../utils/state/actions";

const SocialIcons: React.FC<any> = (props: any) => {
  const googleAuthApi = process.env.REACT_APP_GOOGLE_AUTH_API;
  const facebookAuthApi = process.env.REACT_APP_FACEBOOK_AUTH_API;

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
            appId={googleAuthApi}
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
            appId={facebookAuthApi}
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
