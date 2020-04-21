import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const store = createStore(
  rootReducer
  // compose(
  //   applyMiddleware(thunk),
  //   typeof window === 'object' &&
  //   typeof window.devToolsExtension !== 'undefined'
  //     ? window.devToolsExtension()
  //     : () => {}
  // )
);

window.store = store; // TODO remove it prod

export default store;
