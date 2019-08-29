import {
  ROOM_SET_PUBLIC,
  ROOM_SET_PRIVATE,
  ROOM_SET_PERSONAL,
  ROOM_SET_ALL,
} from '../constants/actionTypes';

const initialState: InitialRoomState = {
  public: [],
  private: [],
  personal: []
};

export default (state: any = initialState, action: any) => {
  switch (action.type) {
    case ROOM_SET_PUBLIC:
      return {
        ...state,
        public: action.payload,
      };
    case ROOM_SET_PRIVATE:
      return {
        ...state,
        private: action.payload,
      };
    case ROOM_SET_PERSONAL:
      return {
        ...state,
        personal: action.payload,
      };
    case ROOM_SET_ALL:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

interface InitialRoomState {
  public: Room[];
  private: Room[];
  personal: Room[];
}
interface Room {
  name: string;
  type: 'all' | 'public' | 'private' | 'personal';
  author: string;
  password: string;
  users: string[];
  messages: string[];
}
