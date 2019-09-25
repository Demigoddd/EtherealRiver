import {
  USER_SET_DATA,
  USER_SET_IS_AUTH
} from '../constants/actionTypes';

const initialState: InitialUserState = {
  data: {},
  token: localStorage.getItem("token"),
  isAuth: !!localStorage.getItem("token")
};

export default (state: any = initialState, action: any) => {
  switch (action.type) {
    case USER_SET_DATA:
      return {
        ...state,
        data: action.payload,
        isAuth: true,
        token: localStorage.getItem("token")
      };
    case USER_SET_IS_AUTH:
      return {
        ...state,
        isAuth: action.payload
      };
    default:
      return state;
  }
};

interface InitialUserState {
  data: User;
  token: string | null;
  isAuth: boolean;
}
interface User {
  _id?: string;
  email?: string;
  fullname?: string;
  password?: string;
  confirmed?: boolean;
  avatar?: string;
  confirm_hash?: string;
  last_seen?: Date;
}
