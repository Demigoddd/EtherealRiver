import { combineReducers } from 'redux';

// Import Reducers
import user from './user';
import rooms from './room';
import message from './message';

const rootReducer = combineReducers({
  user,
  rooms,
  message
});

export default rootReducer;
