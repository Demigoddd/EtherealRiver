import * as types from '../constants/actionTypes';

// Other Imports
import messagesApi from '../../api/message';

const setMessageEditMode = (data: any) => (dispatch: any) => {
  dispatch({ type: types.SET_MESSAGE_EDIT_MODE, payload: data });
};

const setMessages = (items: any) => (dispatch: any) => {
  dispatch({ type: types.SET_ITEMS, payload: items });
};

const setMessageLoading = (bool: any) => (dispatch: any) => {
  dispatch({ type: types.SET_MESSAGE_LOADING, payload: bool });
};

const addMessage = (message: any) => (dispatch: any) => {
  dispatch({ type: types.ADD_MESSAGE, payload: message });
};

const updateMessage = (message: any) => (dispatch: any) => {
  dispatch({ type: types.UPDATE_MESSAGE, payload: message });
};

const fetchSendMessage = (text: any, roomId: any) => (dispatch: any) => {
  messagesApi.send(text, roomId);
};

const fetchUpdateMessage = (data: any) => (dispatch: any) => {
  messagesApi.updateMessage(data);
};

const fetchUpdateEmotion = (data: any) => (dispatch: any) => {
  messagesApi.updateEmotion(data);
};

const removeMessageById = (id: any, deleteForAll: boolean) => (dispatch: any) => {
  messagesApi.removeById(id, deleteForAll)
    .then(({ data }: any) => {
      dispatch({
        type: types.REMOVE_MESSAGE,
        payload: id
      });
    })
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
  setMessageEditMode,
  setMessages,
  addMessage,
  updateMessage,
  fetchSendMessage,
  fetchUpdateMessage,
  fetchUpdateEmotion,
  setMessageLoading,
  removeMessageById,
  fetchMessages
};
