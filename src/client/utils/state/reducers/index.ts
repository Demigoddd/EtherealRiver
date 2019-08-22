import { combineReducers } from 'redux';

// Import Reducers
import user from './user';
import flashMessage from './flashMessage';

const rootReducer = combineReducers({
  user,
  flashMessage
});

export default rootReducer;
