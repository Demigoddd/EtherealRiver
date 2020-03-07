import * as types from '../constants/actionTypes';

// Other Imports
import messagesApi from '../../api/message';

const setMessageEditMode = (data: any): any => (dispatch: any) => {
  dispatch({ type: types.SET_MESSAGE_EDIT_MODE, payload: data });
};

const setMessages = (items: any): any => (dispatch: any) => {
  dispatch({ type: types.SET_ITEMS, payload: items });
};

const setMessageLoading = (bool: any): any => (dispatch: any) => {
  dispatch({ type: types.SET_MESSAGE_LOADING, payload: bool });
};

const addMessage = (message: any): any => (dispatch: any) => {
  dispatch({ type: types.ADD_MESSAGE, payload: message });
};

const updateMessage = (message: any): any => (dispatch: any) => {
  dispatch({ type: types.UPDATE_MESSAGE, payload: message });
};

const removeMessage = (id: any): any => (dispatch: any) => {
  dispatch({ type: types.REMOVE_MESSAGE, payload: id });
};

const fetchSendMessage = (message: any): any => (dispatch: any) => {
  messagesApi.send(message);
};

const fetchUpdateMessage = (data: any): any => (dispatch: any) => {
  messagesApi.updateMessage(data);
};

const fetchUpdateEmotion = (data: any): any => (dispatch: any) => {
  messagesApi.updateEmotion(data);
};

const removeMessageById = (id: any, deleteForAll: boolean): any => (dispatch: any) => {
  messagesApi.removeById(id, deleteForAll)
    .then(({ data }: any) => {
      removeMessage(id)(dispatch);
    })
};

const fetchMessages = (roomId: any): any => (dispatch: any) => {
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
  removeMessage,
  fetchSendMessage,
  fetchUpdateMessage,
  fetchUpdateEmotion,
  setMessageLoading,
  removeMessageById,
  fetchMessages
};
