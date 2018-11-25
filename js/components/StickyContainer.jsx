import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StickyContainer.scss';

class StickyContainer extends Component {
  state = {
    topFixed: false,
    bottomFixed: false
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  getClassName() {
    let className = '';

    if (this.state.topFixed) {
      className += ' StickyContainer--top-fixed';
    }

    if (this.state.bottomFixed) {
      className += ' StickyContainer--bottom-fixed';
    }

    return className;
  }

  handleScroll = () => {
    const container = document.querySelector(this.props.targetSelector);

    if (!container) {
      console.warn('invalid flow. check me');
      return;
    }

    const containerMetrics = container.getBoundingClientRect();

    const StickyContainerHeight = container.querySelector('.StickyContainer')
      .clientHeight;

    debugger;

    if (
      containerMetrics.bottom <
      StickyContainerHeight + this.props.topOffset
    ) {
      if (!this.state.bottomFixed) {
        this.setState({ bottomFixed: true, topFixed: false });
      }
    } else {
      if (this.state.bottomFixed) {
        this.setState({ bottomFixed: false });
      }
      if (containerMetrics.top < this.props.topOffset) {
        if (!this.state.topFixed) {
          this.setState({ topFixed: true });
        }
      } else {
        if (this.state.topFixed) {
          this.setState({ topFixed: false });
        }
      }
    }
  };

  render() {
    return (
      <div className={`StickyContainer ${this.getClassName()}`}>
        {this.props.children}
      </div>
    );
  }
}

StickyContainer.defaultProps = {
  targetSelector: '',
  children: null,
  topOffset: 0
};

StickyContainer.propTypes = {
  targetSelector: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node),
  topOffset: PropTypes.number
};

export default StickyContainer;
