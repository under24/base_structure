import React from 'react';
import PropTypes from 'prop-types';
import './Banner.scss';

const Banner = props => {
  let image;
  let overlay;

  if (props.banner) {
    image = <div className="Banner__image" />;
  }

  if (props.banner) {
    overlay = <div className="Banner__overlay" />;
  } else {
    overlay = <div className="Banner__no-banner" />;
  }

  return (
    <div className="Banner">
      {image}
      {overlay}
    </div>
  );
};

Banner.defaultProps = {
  banner: ''
};

Banner.propTypes = {
  banner: PropTypes.string
};

export default Banner;
