import React from 'react';
import { render } from 'react-dom';
import App from './features/App';

const el = document.getElementById('main');
render(<App />, el);

if (process.env.NODE_ENV !== 'production' && typeof module.hot !== 'undefined') {
  module.hot.accept();
}
