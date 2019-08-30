import {
  ROOM_SET_ALL,
} from '../constants/actionTypes';

const initialState: InitialRoomState = {
  my: [],
  personal: [],
  public: [],
  private: [],
};

export default (state: any = initialState, action: any) => {
  switch (action.type) {
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
  my: Room[],
  personal: Room[];
  public: Room[];
  private: Room[];
}
interface Room {
  name: string;
  type: 'all' | 'public' | 'private' | 'personal';
  author: string;
  password: string;
  users: string[];
  messages: string[];
}
