import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from 'components/contextual/App';
import configureStore from 'store/configureStore';
import "reflect-metadata";
import { copyInitialDB, checkApplicationUpdate } from './utils/Utils'

// const init = async () => {
//   await copyInitialDB()
//   checkApplicationUpdate()
// }

// init()

const store = configureStore();
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
