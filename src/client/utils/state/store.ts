import { configureStore } from 'redux-starter-kit';
import rootReducer from './reducers/index';

const hasDev = process.env.NODE_ENV === 'development' ? true : false;

export const store = configureStore({
  devTools: hasDev,
  reducer: rootReducer
});

export default store;
