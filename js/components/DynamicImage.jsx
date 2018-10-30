import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DynamicImage.scss';

class DynamicImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'idle'
    };
  }

  onLoad = () => {
    this.setState({
      status: 'loaded'
    });
  };

  onError = () => {
    debugger;
    console.log('image failed to load');
  };

  render() {
    let hidden = '';
    if (this.state.status === 'loaded') {
      hidden = 'DynamicImage__overlay--hidden';
    }

    let dynamicImage = '';
    if (this.props.url) {
      dynamicImage = (
        <img
          className="DynamicImage__image"
          src={this.props.url}
          alt={this.props.alt}
          onLoad={this.onLoad}
          onError={this.onError}
        />
      );
    }

    return (
      <div className={`DynamicImage ${this.props.className}`}>
        {dynamicImage}
        <div className={`DynamicImage__overlay ${hidden}`} />
      </div>
    );
  }
}

DynamicImage.defaultProps = {
  url: '',
  alt: '',
  className: ''
};

DynamicImage.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string
};

export default DynamicImage;
