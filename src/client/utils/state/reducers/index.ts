import { combineReducers } from 'redux';

// Import Reducers
import flashMessage from './flashMessage';

const rootReducer = combineReducers({
  flashMessage
});

export default rootReducer;
