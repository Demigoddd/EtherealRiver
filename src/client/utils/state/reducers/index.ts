import { combineReducers } from 'redux';

// Import Reducers
import user from './user';

const rootReducer = combineReducers({
  user
});

export default rootReducer;
