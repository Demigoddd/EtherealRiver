import * as types from '../constants/actionTypes';

const initialState: InitialAttachmentState = {
  items: []
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case types.SET_ATTACHMENTS:
      return {
        ...state,
        items: payload
      };
    case types.REMOVE_ATTACHMENTS:
      return {
        ...state,
        items: state.items.filter((item: any) => item.uid !== payload.uid)
      };
    default:
      return state;
  }
};

interface InitialAttachmentState {
  items: Attachment[];
}

interface Attachment {
  filename: string;
  size: number;
  ext: string;
  url: string;
  message: string;
  user: string;
}
