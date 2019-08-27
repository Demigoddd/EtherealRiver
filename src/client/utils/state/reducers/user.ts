import {
  USER_SET_DATA,
  USER_SET_IS_AUTH
} from '../constants/actionTypes';

const initialState = {
  data: null,
  accessToken: window.localStorage.accessToken,
  isAuth: !!window.localStorage.accessToken
};

export default (state: any = initialState, action: any) => {
  switch (action.type) {
    case USER_SET_DATA:
      return {
        ...state,
        data: action.payload,
        isAuth: true,
        accessToken: window.localStorage.accessToken
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
