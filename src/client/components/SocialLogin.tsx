import React from 'react'
import { ReactComponent as GoogleIcon } from '../assets/images/socialIcons/google.svg';
import { ReactComponent as FacebookIcon } from '../assets/images/socialIcons/facebook.svg';
// @ts-ignore
import SocialLogin from 'react-social-login'

const Button: React.FC<any> = ({ type, children, triggerLogin, ...props }) => (
  <>
    { (type === 'google')
      && <GoogleIcon onClick={triggerLogin} {...props}>
          { children }
        </GoogleIcon>
    }

    {
      (type === 'facebook')
      && <FacebookIcon onClick={triggerLogin} {...props}>
          { children }
        </FacebookIcon>
    }
  </>
)

export default SocialLogin(Button);
