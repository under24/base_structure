import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Landing from './pages/Landing';
import Search from './pages/Search';
import Details from './pages/Details';
import NotFound from './pages/NotFound';
import preload from '../data.json';
import './App.scss';

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route
            path="/search"
            component={props => <Search shows={preload.shows} {...props} />}
          />
          <Route
            path="/details/:id"
            component={props => {
              const currentShow = preload.shows.find(
                show => props.match.params.id === show.imdbID //eslint-disable-line
              );

              return <Details show={currentShow} {...props} />;
            }}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Provider>
  </BrowserRouter>
);

export default App;
