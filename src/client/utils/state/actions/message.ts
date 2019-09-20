import * as types from '../constants/actionTypes';

// Other Imports
import messagesApi from '../../api/message';


const setMessages = (items: any) => (dispatch: any) => {
  dispatch({ type: types.SET_ITEMS, payload: items });
};

const setMessageLoading = (bool: any) => (dispatch: any) => {
  dispatch({ type: types.SET_MESSAGE_LOADING, payload: bool });
};

const addMessage = (message: any) => (dispatch: any, getState: any) => {
  const { rooms } = getState();
  const { currentRoomId } = rooms;

  if (currentRoomId === message.room._id) {
    dispatch({
      type: types.ADD_MESSAGE,
      payload: message
    });
  }
};

const fetchSendMessage = (text: any, roomId: any) => (dispatch: any) => {
  messagesApi.send(text, roomId);
};

const removeMessageById = (id: any) => (dispatch: any) => {
  setMessageLoading(true)(dispatch);
  messagesApi.removeById(id)
    .then(({ data }: any) => {
      dispatch({
        type: types.REMOVE_MESSAGE,
        payload: id
      });
    })
    .catch(() => {
      setMessageLoading(false)(dispatch);
    });
};

const fetchMessages = (roomId: any) => (dispatch: any) => {
  setMessageLoading(true)(dispatch);
  messagesApi.getAllByRoomId(roomId)
    .then(({ data }: any) => {
      setMessages(data)(dispatch);
    })
    .catch(() => {
      setMessageLoading(false)(dispatch);
    });
};

export default {
  setMessages,
  addMessage,
  fetchSendMessage,
  setMessageLoading,
  removeMessageById,
  fetchMessages
};
