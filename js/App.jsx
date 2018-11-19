import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import Movies from './pages/Movies';
import Movie from './pages/Movie';
import Person from './pages/person/Person';
import People from './pages/people/People';
import Search from './pages/search/Search';
import './App.scss';

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <div className="App">
        <Switch>
          {/* home page */}
          <Route exact path="/" component={Landing} />

          {/* movies page */}
          <Route exact path="/movies" component={Movies} />

          {/* movie summary page */}
          <Route path="/movies/:slug" component={Movie} />

          {/* person page */}
          <Route path="/people/:tmdbId" component={Person} />

          <Route path="/people/" component={People} />

          {/* search page */}
          <Route path="/search" component={Search} />

          {/* 404 page */}
          <Route component={NotFound} />
        </Switch>
      </div>
    </Provider>
  </BrowserRouter>
);

export default App;
