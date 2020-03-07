import * as types from '../constants/actionTypes';
import { filesApi } from '../../../utils/api';
import { openNotification } from '../../helpers/openNotification';

const setAttachments = (items: any): any => (dispatch: any) => {
  dispatch({ type: types.SET_ATTACHMENTS, payload: items });
}

const removeAttachment = (file: any): any => (dispatch: any) => {
  dispatch({ type: types.REMOVE_ATTACHMENTS, payload: file });
}

// not used
const destroyAttachment = (file: any): any => (dispatch: any) => {
  filesApi.destroy(file.public_id)
    .then(() => {
      removeAttachment(file)(dispatch);
    })
    .catch(() => {
      openNotification({
        title: "Error.",
        text: "Error when removing file.",
        type: "error"
      });
    });
}

const setAttachmentLoading = (isLoading: boolean): any => (dispatch: any) => {
  dispatch({ type: types.LOADING_ATTACHMENTS, payload: isLoading });
}

export default {
  setAttachments,
  removeAttachment,
  destroyAttachment,
  setAttachmentLoading
};
