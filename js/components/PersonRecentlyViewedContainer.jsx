import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LSU from '../utils/localStorageUtils';

class PersonRecentlyViewedContainer {
  componentWillMount() {
    debugger;
  }

  render() {
    return <div>123</div>;
  }
}

// RecentlyViewed.defaultProps = {
//   className: ''
// };
//
// RecentlyViewed.propTypes = {
//   className: PropTypes.string
// };

const mapStateToProps = (state, ownProps) => {
  debugger;

  return {};
};

export default connect(mapStateToProps)(PersonRecentlyViewedContainer);
