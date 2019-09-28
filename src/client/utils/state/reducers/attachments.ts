import * as types from '../constants/actionTypes';

const initialState: InitialAttachmentState = {
  items: [],
  attachmentLoading: false
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case types.SET_ATTACHMENTS:
      return {
        ...state,
        items: payload,
      };
    case types.REMOVE_ATTACHMENTS:
      return {
        ...state,
        items: state.items.filter((item: any) => item.uid !== payload.uid)
      };
    case types.LOADING_ATTACHMENTS:
      return {
        ...state,
        attachmentLoading: payload
      };
    default:
      return state;
  }
};

interface InitialAttachmentState {
  items: Attachment[];
  attachmentLoading: boolean;
}

interface Attachment {
  filename: string;
  size: number;
  ext: string;
  public_id: string;
  url: string;
  message: string;
  user: string;
}
