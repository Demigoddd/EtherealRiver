import * as types from '../constants/actionTypes';

const setAttachments = (items: any) => (dispatch: any) => {
  dispatch({ type: types.SET_ATTACHMENTS, payload: items });
}

const removeAttachment = (file: any) => (dispatch: any) => {
  dispatch({ type: types.REMOVE_ATTACHMENTS, payload: file });
}

export default {
  setAttachments,
  removeAttachment,
};
