import * as types from '../constants/actionTypes';

// Other Imports
import messagesApi from '../../api/message';


const setMessages = (items: any) => (dispatch: any) => {
  dispatch({ type: types.SET_ITEMS, payload: items });
};

const setIsLoading = (bool: any) => (dispatch: any) => {
  dispatch({ type: types.SET_IS_LOADING, payload: bool });
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
  setIsLoading(true)(dispatch);
  messagesApi.removeById(id)
    .then(({ data }: any) => {
      dispatch({
        type: types.REMOVE_MESSAGE,
        payload: id
      });
    })
    .catch(() => {
      setIsLoading(false)(dispatch);
    });
};

const fetchMessages = (roomId: any) => (dispatch: any) => {
  setIsLoading(true)(dispatch);
  messagesApi.getAllByRoomId(roomId)
    .then(({ data }: any) => {
      setMessages(data)(dispatch);
    })
    .catch(() => {
      setIsLoading(false)(dispatch);
    });
};

export default {
  setMessages,
  addMessage,
  fetchSendMessage,
  setIsLoading,
  removeMessageById,
  fetchMessages
};
