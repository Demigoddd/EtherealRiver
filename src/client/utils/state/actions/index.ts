import * as types from '../constants/actionTypes';

// Other Imports
import { openNotification } from "../../helpers/openNotification";
import userApi from "../../api/user";

// User Actions
export const setUserData = (payload: any) => (dispatch: any) => {
  dispatch({ type: types.USER_SET_DATA, payload });
};
export const setIsAuth = (setIsAuth: boolean) => (dispatch: any) => {
  dispatch({ type: types.USER_SET_IS_AUTH, setIsAuth });
};
export const fetchUserData = () => (dispatch: any) => {
  userApi
    .findById()
    .then(({ data }: any) => {
      setUserData(data);
    })
    .catch((err: any) => {
      if (err.response.status === 403) {
        setIsAuth(false);
        delete window.localStorage.token;
      }
    });
};
export const fetchUserLogin = (postData: any) => {
  return userApi
    .login(postData)
    .then(({ data }: any) => {
      const { token } = data;

      openNotification({
        title: "Success!",
        text: "Authorization Success.",
        type: "success"
      });

      // window.axios.defaults.headers.common["token"] = token;
      window.localStorage["token"] = token;
      fetchUserData();
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
export const fetchUserRegister = (postData: any) => {
  return userApi.login(postData)
    .then(({ data }: any) => {
      return data;
    });
};

// Flash Message
export const openFlashMessage = (payload: any) => (dispatch: any) => {
  dispatch({ type: types.OPEN_FLASH_MESSAGE, payload })
};
export const clearFlashMessage = () => (dispatch: any) => {
  dispatch({ type: types.CLOSE_FLASH_MESSAGE })
};
