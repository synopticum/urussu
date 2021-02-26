import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

const el = document.getElementById('main');
render(<App />, el);

if (process.env.NODE_ENV !== 'production' && typeof module.hot !== 'undefined') {
  module.hot.accept();
}

// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('./providers/reducers', () => {
//     const newRootReducer = require('./providers/reducers').default;
//     store.replaceReducer(newRootReducer);
//   });
// }
