import {
  SET_ALL,
  SET_CURRENT,
  SET_ROOM_LOADING
} from '../constants/actionTypes';

const initialState: InitialRoomState = {
  my: [],
  public: [],
  private: [],
  currentRoom: {},
  roomLoading: false
};

export default (state: any = initialState, action: any) => {
  switch (action.type) {
    case SET_ALL:
      return {
        ...state,
        ...action.payload,
        roomLoading: false
      };
    case SET_CURRENT:
      return {
        ...state,
        currentRoom: action.payload,
        roomLoading: false
      };
    case SET_ROOM_LOADING:
      return {
        ...state,
        roomLoading: action.payload
      };
    default:
      return state;
  }
};

interface InitialRoomState {
  my: Room[];
  public: Room[];
  private: Room[];
  currentRoom: any;
  roomLoading: Boolean;
}
interface Room {
  _id?: string;
  name?: string;
  type?: 'public' | 'private';
  author?: string;
  password?: string;
  users?: string[];
  messages?: string[];
}
