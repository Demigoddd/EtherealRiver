import {
  ADD_MESSAGE,
  SET_ITEMS,
  REMOVE_MESSAGE,
  SET_IS_LOADING
} from '../constants/actionTypes';

const initialState: InitialMessageState = {
  items: [],
  isLoading: false
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
        isLoading: false
      };
    case REMOVE_MESSAGE:
      return {
        ...state,
        items: state.items.filter((message: any) => message._id !== payload)
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: payload
      };
    default:
      return state;
  }
};

interface InitialMessageState {
  items: Message[];
  isLoading: Boolean;
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
