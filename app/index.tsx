import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from 'components/contextual/App';
import configureStore from 'store/configureStore';
import "reflect-metadata";

const store = configureStore();
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
