import * as types from '../constants/actionTypes';

// Flash Message
export const openFlashMessage = (payload: any) => (dispatch: any) => {
  dispatch({ type: types.OPEN_FLASH_MESSAGE, payload })
};
export const clearFlashMessage = () => (dispatch: any) => {
  dispatch({ type: types.CLOSE_FLASH_MESSAGE })
};
