import React from 'react';
import { render } from 'react-dom';
import App from './App';
// import Perf from 'react-addons-perf';

// window.Perf = Perf;
// Perf.start();

const renderApp = () => {
  render(<App />, document.getElementById('root'));
};

renderApp();
