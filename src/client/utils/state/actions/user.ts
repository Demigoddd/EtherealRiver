import * as types from '../constants/actionTypes';
import { history } from '../../history';

// Other Imports
import { openNotification } from '../../helpers/openNotification';
import userApi from '../../api/user';

// User Actions
const setUserData = (payload: any) => (dispatch: any) => {
  dispatch({ type: types.USER_SET_DATA, payload });
};

const setIsAuth = (setIsAuth: boolean) => (dispatch: any) => {
  dispatch({ type: types.USER_SET_IS_AUTH, setIsAuth });
};

const fetchUserDataById = (id: any) => {
  return userApi.show(id)
    .then(({ data }: any) => {
      return data;
    })
    .catch((err: any) => {
      if (err.response.status === 404) {
        openNotification({
          title: "Error.",
          text: "User is not found.",
          type: "error"
        });
      }
      throw Error(err);
    });
};

const fetchUserData = () => (dispatch: any) => {
  userApi.getMe()
    .then(({ data }: any) => {
      setUserData(data)(dispatch);
    })
    .catch((err: any) => {
      setIsAuth(false);
      localStorage.removeItem("token");
      history.go("/");
    });
};

const fetchUserLogin = (postData: any) => (dispatch: any) => {
  let callback: any = {};

  if (postData.password) {
    callback = userApi.login(postData);
  } else if (postData.email && !postData.password) {
    callback = userApi.socialLogin(postData);
  } else {
    openNotification({
      title: "Authorization Error.",
      text: "Incorrect Data.",
      type: "error"
    });
    throw Error("Authorization Error.");
  }

  return callback
    .then(({ data }: any) => {
      const { token } = data;

      openNotification({
        title: "Success!",
        text: "Authorization Success.",
        type: "success"
      });

      localStorage.setItem("token", token);
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
      } else if (response.status === 404) {
        openNotification({
          title: "Authorization Error.",
          text: "User is not found.",
          type: "error"
        });
      } else if (response.status === 409) {
        openNotification({
          title: "Authorization Error.",
          text: "Sorry user not confirmed.",
          type: "error"
        });
      } else if (response.status === 500) {
        openNotification({
          title: "Authorization Error.",
          text: "Server Error.",
          type: "error"
        });
      }
      throw Error(response);
    });
};

const fetchUserRegister = (postData: any) => (dispatch: any) => {
  let callback: any = {};

  if (postData.password) {
    callback = userApi.register(postData);
  } else if (postData.email && !postData.password) {
    callback = userApi.socialRegister(postData);
  } else {
    openNotification({
      title: "Authorization Error.",
      text: "Incorrect Data.",
      type: "error"
    });
    throw Error("Authorization Error.");
  }

  return callback
    .then(({ data }: any) => {
      return data;
    })
    .catch((err: any) => {
      openNotification({
        title: "Registration Error.",
        text: "Error.",
        type: "error"
      });
      throw Error(err);
    });
};

const fetchUserLogout = () => {
  setIsAuth(false);
  localStorage.removeItem("token");
  history.go("/");
};

export default {
  setUserData,
  setIsAuth,
  fetchUserDataById,
  fetchUserData,
  fetchUserLogin,
  fetchUserRegister,
  fetchUserLogout
};
