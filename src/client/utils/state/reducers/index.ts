import { combineReducers } from 'redux';

// Import Reducers
import user from './user';
import room from './room';

const rootReducer = combineReducers({
  user,
  room
});

export default rootReducer;
