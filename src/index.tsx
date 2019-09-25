import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

// Component Imports
import { Main } from './client/index/Main';

// Other Imports
import * as serviceWorker from './client/utils/serviceWorker';
import { history } from './client/utils/history';
import { store } from './client/utils/state/store';

// APP CSS
import 'antd/dist/antd.css';
import './client/assets/styles/app.scss';
import "emoji-mart/css/emoji-mart.css";

const App: React.FC = () => {
  return (
    <Router history={history}>
      <ReduxProvider store={store}>
        <Main />
      </ReduxProvider>
    </Router>
  );
};

ReactDOM.render(
  <Suspense fallback={<div />}>
    <App />
  </Suspense>,
  document.getElementById('root')
);
