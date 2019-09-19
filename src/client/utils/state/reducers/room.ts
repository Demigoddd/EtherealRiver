import {
  SET_ALL,
  SET_CURRENT
} from '../constants/actionTypes';

const initialState: InitialRoomState = {
  my: [],
  public: [],
  private: [],
  currentRoom: {},
  isLoading: false
};

export default (state: any = initialState, action: any) => {
  switch (action.type) {
    case SET_ALL:
      return {
        ...state,
        ...action.payload,
      };
    case SET_CURRENT:
      return {
        ...state,
        currentRoom: action.payload,
      };
    default:
      return state;
  }
};

interface InitialRoomState {
  my: Room[];
  public: Room[];
  private: Room[];
  currentRoom: Room;
  isLoading: Boolean;
}
interface Room {
  _id?: string;
  name?: string;
  type?: 'all' | 'public' | 'private';
  author?: string;
  password?: string;
  users?: string[];
  messages?: string[];
}
