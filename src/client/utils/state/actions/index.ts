import * as types from '../constants/actionTypes';

// Other Imports
import { useLocalStorage } from '../../hooks/useLocalStorage';
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
      setUserData(data);
    })
    .catch((err: any) => {
      if (err.response.status === 403) {
        const [, setAccessToken] = useLocalStorage('accessToken');
        setIsAuth(false);
        setAccessToken('');
      }
    });
};
export const fetchUserLogin = (postData: any) => {
  return userApi
    .login(postData)
    .then(({ data }: any) => {
      const [accessToken, setAccessToken] = useLocalStorage('accessToken');

      openNotification({
        title: "Success!",
        text: "Authorization Success.",
        type: "success"
      });

      (window as any).axios.defaults.headers.common["token"] = accessToken;
      setAccessToken(data.accessToken);
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
