import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';

const render = (Component: React.ElementType) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

// Render
render(App);

// // Hot Module Replacement
// if (module.hot) {
//   module.hot.accept(['./App'], () => {
//     render(require('./App').default);
//   });
// }
