import {
  ADD_MESSAGE,
  UPDATE_MESSAGE,
  SET_ITEMS,
  REMOVE_MESSAGE,
  SET_MESSAGE_LOADING,
  SET_MESSAGE_EDIT_MODE
} from '../constants/actionTypes';

const initialState: InitialMessageState = {
  items: [],
  editMode: {},
  messageLoading: false
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case ADD_MESSAGE:
      return {
        ...state,
        items: [...state.items, payload],
        messageLoading: false
      };
    case UPDATE_MESSAGE:
      return {
        ...state,
        items: state.items.map((n: any) => n._id === payload._id ? payload : n),
      }
    case SET_ITEMS:
      return {
        ...state,
        items: payload,
        messageLoading: false
      };
    case REMOVE_MESSAGE:
      return {
        ...state,
        items: state.items.filter((message: any) => message._id !== payload)
      };
    case SET_MESSAGE_EDIT_MODE:
      return {
        ...state,
        editMode: payload
      };
    case SET_MESSAGE_LOADING:
      return {
        ...state,
        messageLoading: payload
      };
    default:
      return state;
  }
};

interface InitialMessageState {
  items: Message[];
  editMode: EditMode;
  messageLoading: Boolean;
}
interface Message {
  text: String;
  room: String;
  user: String;
  emotions: Emotions;
}
interface Emotions {
  likes: String[],
  dislikes: String[],
  others: any[]
}
interface EditMode {
  isEditMode?: Boolean;
  editMessageId?: String;
  editMessageText?: String;
}
