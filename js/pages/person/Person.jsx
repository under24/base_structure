import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestPersonData } from '../../redux/thunks/person';
import store from '../../redux/store';
import PersonPortrait from '../../components/person/PersonPortrait';
import SocialBlock from '../../components/SocialBlock';
import PersonDetails from '../../components/person/PersonDetails';
import PersonCredits from '../../components/person/PersonCredits';
import PersonHeader from '../../components/person/PersonHeader';
import StickyContainer from '../../components/StickyContainer';
// import PersonPopular from '../../components/person/PersonPopular';
// import RecentlyViewed from '../../components/RecentlyViewed';
import PersonPageCarousel from '../../components/person/PersonPageCarousel';
import scrollUtils from '../../utils/scrollUtils';
import reactUtils from '../../utils/reactUtils';
import './Person.scss';

// /people/:tmdbId
class Person extends Component {
  // when urls changes then request new data
  componentWillMount() {
    this.unlisten = this.props.history.listen(() => {
      scrollUtils.scrollToTop();
      setTimeout(() => this.processPersonData());
    });
  }

  componentDidMount() {
    // request movie data on init
    this.processPersonData();
  }

  // unlisten to url changes after detaching
  componentWillUnmount() {
    this.unlisten();
  }

  // get current person tmdbId from url
  getTmdbId() {
    return parseInt(this.props.match.params.tmdbId, 10);
  }

  processPersonData() {
    const tmdbId = this.getTmdbId();

    // do not load data if it is already in state
    if (this.dataLoaded(tmdbId)) {
      return;
    }

    this.props.requestPersonData(tmdbId);
  }

  dataLoaded() {
    const tmdbId = this.getTmdbId();
    const state = store.getState();

    // data is loaded
    if (state.person[tmdbId]) {
      return true;
    }

    // data not loaded
    return false;
  }

  render() {
    console.log('Person rendered');

    // <PersonPopular className="container-block" />

    return (
      <div className="Person">
        <PersonHeader tmdbId={this.getTmdbId()} />
        <main>
          <div className="container">
            <div
              className="Person__main-left-container"
              id="StickyContainerTarget"
            >
              <StickyContainer
                targetSelector="#StickyContainerTarget"
                topOffset={75}
              >
                <PersonPortrait tmdbId={this.getTmdbId()} />
                <SocialBlock tmdbId={this.getTmdbId()} />
              </StickyContainer>
            </div>
            <div className="Person__main-center-container">
              <div
                className="ads"
                style={{
                  width: '728px',
                  height: '90px',
                  backgroundColor: 'yellow'
                }}
              />
              <PersonDetails tmdbId={this.getTmdbId()} />
              <PersonPageCarousel tmdbId={this.getTmdbId()} />
              <PersonCredits tmdbId={this.getTmdbId()} />
            </div>
            <div className="Person__main-right-container" />
          </div>
        </main>
        <footer>
          <div className="black-divider" />
          <div className="container">
            {/* <RecentlyViewed /> */}
            <div>footer text here</div>
          </div>
        </footer>
      </div>
    );
  }
}

Person.defaultProps = {
  requestPersonData: reactUtils.defaultPropsFunc,
  history: { listen: reactUtils.defaultPropsFunc },
  match: {
    params: {
      tmdbId: null
    }
  }
};

Person.propTypes = {
  requestPersonData: PropTypes.func,
  history: PropTypes.shape({ listen: PropTypes.func }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      tmdbId: PropTypes.string
    })
  })
};

const mapDispatchToProps = dispatch => ({
  requestPersonData(tmdbId) {
    dispatch(requestPersonData(tmdbId));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Person);
