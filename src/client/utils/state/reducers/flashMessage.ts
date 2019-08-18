import {
  OPEN_FLASH_MESSAGE,
  CLOSE_FLASH_MESSAGE
} from '../constants/actionTypes';

const initialState = {
  open: false,
  message: '',
  time: 4000
};

export default (state: any = initialState, action: any) => {
  switch (action.type) {
    case OPEN_FLASH_MESSAGE:
      return {
        ...state,
        open: true,
        message: action.payload
      }
    case CLOSE_FLASH_MESSAGE:
      return {
        ...state,
        open: false
      }
    default:
      return state;
  }
};
