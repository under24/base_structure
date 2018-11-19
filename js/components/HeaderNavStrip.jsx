import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchInput from './SearchInput/SearchInput';
import './HeaderNavStrip.scss';

class HeaderNavStrip extends Component {
  state = {
    viewportAtTop: true
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  getHighlight(item) {
    if (item.includes(this.props.location)) {
      return 'HeaderNavStrip__nav-item--highlighted';
    }

    return '';
  }

  handleScroll = () =>
    this.setState({ viewportAtTop: window.pageYOffset <= 100 });

  render() {
    return (
      <div
        className={`HeaderNavStrip ${
          this.state.viewportAtTop ? '' : 'HeaderNavStrip--fixed'
        }`}
      >
        <div className="container HeaderNavStrip__container">
          <Link className="HeaderNavStrip__logo_text" to="/">
            Медиатека
          </Link>
          <nav className="HeaderNavStrip__nav-container">
            <div
              className={`HeaderNavStrip__nav-item ${this.getHighlight(
                'movies movie'
              )}`}
            >
              Фильмы
            </div>
            <div
              className={`HeaderNavStrip__nav-item ${this.getHighlight('tv')}`}
            >
              ТВ-Шоу
            </div>
            <div
              className={`HeaderNavStrip__nav-item ${this.getHighlight(
                'people person'
              )}`}
            >
              <Link to="/people">Актеры</Link>
            </div>
            <div className="HeaderNavStrip__nav-item">|</div>
            <div className="HeaderNavStrip__nav-item">Find</div>
            <div className="HeaderNavStrip__nav-item">Discover</div>
            <div className="HeaderNavStrip__nav-item">Trending</div>
          </nav>
          <div className="HeaderNavStrip__search-container">
            <SearchInput />
          </div>
        </div>
      </div>
    );
  }
}

HeaderNavStrip.defaultProps = {
  location: ''
};

HeaderNavStrip.propTypes = {
  location: PropTypes.string
};

export default HeaderNavStrip;
