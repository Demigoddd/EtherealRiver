import {
  ADD_MESSAGE,
  SET_ITEMS,
  REMOVE_MESSAGE,
  SET_MESSAGE_LOADING
} from '../constants/actionTypes';

const initialState: InitialMessageState = {
  items: [],
  messageLoading: false
};

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case ADD_MESSAGE:
      return {
        ...state,
        items: [...state.items, payload]
      };
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
  other: any[]
}
