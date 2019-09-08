
import * as types from '../constants/actionTypes';

// Other Imports
import { openNotification } from '../../helpers/openNotification';
import roomApi from '../../api/room';

// Room Actions
const fetchAllRoom = (status: string = '') => (dispatch: any) => {
  if (status === 'error') {
    openNotification({
      title: "Error.",
      text: "Error when adding room.",
      type: "error"
    });
    return;
  };
  if (status === 'success') {
    openNotification({
      title: "Success.",
      text: "Success when adding room.",
      type: "success"
    });
  };

  roomApi.getAll()
    .then(({ data }: any) => {
      dispatch({ type: types.ROOM_SET_ALL, payload: data });
    })
    .catch(({ response }: any) => {
      if (response.status === 404) {
        openNotification({
          title: "Error.",
          text: "Error.",
          type: "error"
        });
      }
    });
};

export default {
  fetchAllRoom,
};
