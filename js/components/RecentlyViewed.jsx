import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LSU from '../utils/localStorageUtils';
import './RecentlyViewed.scss';

class RecentlyViewed extends Component {
  componentWillMount() {
    const storageData = LSU.get('RecentlyViewed');

    if (storageData) {
      this.state = { data: JSON.parse(storageData) };
    }
  }

  render() {
    // debugger;
    // no data to show
    if (!this.state) return null;

    // data is present
    return (
      <div className={`RecentlyViewed ${this.props.className}`}>
        <div className="RecentlyViewed__header">
          <div className="RecentlyViewed__header-text">
            Недавно просмотренные:
          </div>
          <div className="RecentlyViewed__clear-history">Очистить историю</div>
        </div>
        <div className="RecentlyViewed__items">
          {this.state.data.map(item => (
            <div className="RecentlyViewed__item">
              <img
                className="RecentlyViewed__item-image"
                alt=""
                src={`https://image.tmdb.org/t/p/w200/${item.image}`}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

RecentlyViewed.defaultProps = {
  className: ''
};

RecentlyViewed.propTypes = {
  className: PropTypes.string
};

export default RecentlyViewed;
