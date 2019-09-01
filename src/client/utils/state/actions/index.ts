import * as types from '../constants/actionTypes';

// Other Imports
import { openNotification } from '../../helpers/openNotification';
import userApi from '../../api/user';
import roomApi from '../../api/room';

// User Actions
export const setUserData = (payload: any) => (dispatch: any) => {
  dispatch({ type: types.USER_SET_DATA, payload });
};
export const setIsAuth = (setIsAuth: boolean) => (dispatch: any) => {
  dispatch({ type: types.USER_SET_IS_AUTH, setIsAuth });
};
export const fetchUserDataById = (id: any) => {
  return userApi.show(id)
    .then(({ data }: any) => {
      return data;
    })
    .catch((err: any) => {
      if (err.response.status === 404) {
        openNotification({
          title: "Error.",
<<<<<<< HEAD
          text: "User is not found.",
=======
          text: "User is not found",
>>>>>>> auth
          type: "error"
        });
      }
      throw Error(err);
    });
};
export const fetchUserData = () => (dispatch: any) => {
  userApi.getMe()
    .then(({ data }: any) => {
      setUserData(data)(dispatch);
    })
    .catch((err: any) => {
      setIsAuth(false);
      window.localStorage.removeItem('token');
      window.location.href = '/';
      throw Error(err);
    });
};
export const fetchUserLogin = (postData: any) => (dispatch: any) => {
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
      } else if (response.status === 404) {
        openNotification({
          title: "Authorization Error.",
<<<<<<< HEAD
          text: "User is not found.",
=======
          text: "User is not found",
>>>>>>> auth
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
export const fetchUserRegister = (postData: any) => (dispatch: any) => {
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
<<<<<<< HEAD
        title: "Error.",
        text: "Sorry there was an error",
=======
        title: "Registration Error.",
        text: "Error.",
>>>>>>> auth
        type: "error"
      });
      throw Error(err);
    });
};
export const fetchUserLogout = () => {
  setIsAuth(false);
  window.localStorage.removeItem('token');
  window.location.href = '/';
};

// Room Actions
export const fetchAllRoom = () => (dispatch: any) => {
  roomApi.getAll()
    .then(({ data }: any) => {
      dispatch({ type: types.ROOM_SET_ALL, payload: data });
    })
    .catch(({ response }: any) => {
      if (response.status === 404) {
        openNotification({
          title: "Error.",
          text: "Sorry rooms is not found.",
          type: "error"
        });
      }
    });
};
export const createRoom = (postData: any) => (dispatch: any) => {
  return roomApi.create(postData)
    .then(({ data }: any) => {
      openNotification({
        title: "Success!",
        text: "Room created.",
        type: "success"
      });

      fetchAllRoom()(dispatch);
    })
    .catch((err: any) => {
      openNotification({
        title: "Error.",
        text: "Sorry there was an error",
        type: "error"
      });
      throw Error(err);
    });
};
