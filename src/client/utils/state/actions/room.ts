import * as types from '../constants/actionTypes';

// Other Imports
import rootSocket from '../../socket';
import { openNotification } from '../../helpers/openNotification';
import roomApi from '../../api/room';

// Room Actions
const fetchAllRoom = () => (dispatch: any) => {
  setRoomLoading(true)(dispatch);
  roomApi.getAll()
    .then(({ data }: any) => {
      dispatch({ type: types.SET_ALL, payload: data });
    })
    .catch((error: any) => {
      setRoomLoading(false)(dispatch);
      if (error.response.status === 404) {
        openNotification({
          title: "Error.",
          text: "Error.",
          type: "error"
        });
      }
    });
};

const fetchCreateRoom = (data: any) => (dispatch: any) => {
  setRoomLoading(true)(dispatch);
  return roomApi.create(data)
    .then((response: any) => {
      rootSocket.emit("JoinRoom", response.data._id, data.userId);
      setCurrentRoom(response.data)(dispatch);

      openNotification({
        title: "Success.",
        text: "Success when creating room.",
        type: "success"
      });
    })
    .catch((error: any) => {
      setRoomLoading(false)(dispatch);
      openNotification({
        title: "Error.",
        text: "Error when creating room.",
        type: "error"
      });
    });
};

const fetchDeleteRoom = (roomId: any) => (dispatch: any) => {
  setRoomLoading(true)(dispatch);
  roomApi.delete(roomId)
    .then((response: any) => {
      openNotification({
        title: "Success.",
        text: ` ${response.data.name} deleted.`,
        type: "success"
      });
    })
    .catch((error: any) => {
      setRoomLoading(false)(dispatch);
      openNotification({
        title: "Error.",
        text: "Error when removing room.",
        type: "error"
      });
    });
};

const fetchFindRoomById = (roomId: any, userId: any) => (dispatch: any) => {
  setRoomLoading(true)(dispatch);
  roomApi.index(roomId)
    .then((response: any) => {
      setCurrentRoom(response.data.room)(dispatch);

      if (response.data.userExistInRoom) {
        rootSocket.emit("JoinRoom", response.data.room._id, userId);
      }
    })
    .catch((error: any) => {
      setRoomLoading(false)(dispatch);
      openNotification({
        title: "Error.",
        text: "Error when finding room.",
        type: "error"
      });
    });
};

const fetchUpdateRoom = (data: any) => (dispatch: any) => {
  setRoomLoading(true)(dispatch);
  roomApi.updateRoom(data)
    .then((response: any) => {
      openNotification({
        title: "Success.",
        text: "Success when updating room.",
        type: "success"
      });
    })
    .catch((error: any) => {
      setRoomLoading(false)(dispatch);
      openNotification({
        title: "Error.",
        text: "Error when updating room.",
        type: "error"
      });
    });
};

const fetchAddUserToRoom = (data: any) => (dispatch: any) => {
  setRoomLoading(true)(dispatch);
  roomApi.addUser(data)
    .then((response: any) => {
      rootSocket.emit("JoinRoom", response.data._id, data.userId);
      setCurrentRoom(response.data)(dispatch);
      fetchAllRoom()(dispatch);

      openNotification({
        title: "Success.",
        text: `Joined to ${response.data.name}.`,
        type: "success"
      });
    })
    .catch((error: any) => {
      setRoomLoading(false)(dispatch);
      if (error.response.status === 400) {
        openNotification({
          title: "Error.",
          text: "Incorrect Password.",
          type: "error"
        });
      } else {
        openNotification({
          title: "Error.",
          text: "Error when ading user to room.",
          type: "error"
        });
      }
    });
};

const fetchRemoveUserFromRoom = (data: any) => (dispatch: any) => {
  setRoomLoading(true)(dispatch);
  roomApi.removeUser(data)
    .then((response: any) => {
      rootSocket.emit("LeaveRoom", response.data.roomId, response.data.socketId, data.adminId);
    })
    .catch((error: any) => {
      setRoomLoading(false)(dispatch);
      openNotification({
        title: "Error.",
        text: "Error when removing user from room.",
        type: "error"
      });
    });
};

const setCurrentRoom = (data: any) => (dispatch: any) => {
  dispatch({ type: types.SET_CURRENT, payload: data });

  // window.sessionStorage.setItem('currentRoom', JSON.stringify(data));
};

const setRoomLoading = (bool: any) => (dispatch: any) => {
  dispatch({ type: types.SET_ROOM_LOADING, payload: bool });
};

export default {
  fetchAllRoom,
  fetchCreateRoom,
  fetchDeleteRoom,
  fetchFindRoomById,
  fetchUpdateRoom,
  fetchAddUserToRoom,
  fetchRemoveUserFromRoom,
  setCurrentRoom,
  setRoomLoading
};
