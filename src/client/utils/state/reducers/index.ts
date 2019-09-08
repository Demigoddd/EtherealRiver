import { combineReducers } from 'redux';

// Import Reducers
import user from './user';
import rooms from './room';

const rootReducer = combineReducers({
  user,
  rooms
});

export default rootReducer;
