import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestPeopleData } from '../../redux/thunks/people';
import store from '../../redux/store';
import reactUtils from '../../utils/reactUtils';
import './People.scss';

// this.props.history.push('/people?page=2');

/* 
 * /people/
 */
class People extends Component {
  // when urls changes then request new movie data
  componentWillMount() {
    this.unlisten = this.props.history.listen(() => {
      setTimeout(() => this.processPeopleData());
    });
  }

  // request movie data on init
  componentDidMount() {
    this.processPeopleData();
  }

  // unlisten to url changes after detaching
  componentWillUnmount() {
    this.unlisten();
  }

  getPage() {
    const page = new URLSearchParams(this.props.location.search).get('page');

    // if page query is not present or not correct
    if (page === null || isNaN(+page)) {
      // load page 1
      return 1;
    }

    return +page;
  }

  processPeopleData() {
    const page = this.getPage();

    if (this.dataLoaded(page)) {
      return;
    }

    this.props.requestPeopleData(page);
  }

  dataLoaded() {
    const state = store.getState();
    const page = this.getPage();

    if (state.people.pages && state.people.pages[page]) {
      // data is loaded
      return true;
    }

    // data is not loaded
    return false;
  }

  render() {
    console.log('People rendered');

    return (
      <div className="People">
        <header>header</header>
        <main>
          <div className="container">main</div>
        </main>
        <footer>footer</footer>
      </div>
    );
  }
}

People.defaultProps = {
  requestPeopleData: reactUtils.defaultPropsFunc
};

People.propTypes = {
  requestPeopleData: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  requestPeopleData(tmdbId) {
    dispatch(requestPeopleData(tmdbId));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(People);
