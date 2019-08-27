import * as types from '../constants/actionTypes';

// Other Imports
import { openNotification } from '../../helpers/openNotification';
import userApi from '../../api/user';

// User Actions
export const setUserData = (payload: any) => (dispatch: any) => {
  dispatch({ type: types.USER_SET_DATA, payload });
};
export const setIsAuth = (setIsAuth: boolean) => (dispatch: any) => {
  dispatch({ type: types.USER_SET_IS_AUTH, setIsAuth });
};
export const fetchUserData = () => (dispatch: any) => {
  userApi
    .getMe()
    .then(({ data }: any) => {
      setUserData(data)(dispatch);
    })
    .catch((err: any) => {
      if (err.response.status === 403) {
        setIsAuth(false);
        delete window.localStorage.token;
      }
    });
};
export const fetchUserLogin = (postData: any) => (dispatch: any) => {
  return userApi
    .login(postData)
    .then(({ data }: any) => {
      const { token } = data;

      openNotification({
        title: "Success!",
        text: "Authorization Success.",
        type: "success"
      });

      (window as any).axios.defaults.headers.common["token"] = token;
      window.localStorage["token"] = token;
      fetchUserData()(dispatch);
      setIsAuth(true);
      return data;
    })
    .catch(({ response }: any) => {
      if (response.status === 403) {
        openNotification({
          title: "Authorization Error.",
          text: "Incorrect Login or Password.",
          type: "error"
        });
      }
    });
};
export const fetchUserRegister = (postData: any) => (dispatch: any) => {
  return userApi.register(postData)
    .then(({ data }: any) => {
      return data;
    });
};
