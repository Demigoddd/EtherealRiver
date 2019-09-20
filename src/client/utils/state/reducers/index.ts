import { combineReducers } from 'redux';

// Import Reducers
import user from './user';
import rooms from './room';
import message from './message';
import attachments from './attachments';

const rootReducer = combineReducers({
  user,
  rooms,
  message,
  attachments
});

export default rootReducer;
