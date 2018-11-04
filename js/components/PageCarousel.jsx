import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PageCarousel.scss';

class PageCarousel extends Component {
  test = event => {
    // debugger;
    console.log(event.clientX, event.clientY);

    let initX = event.clientX;
    const viewportContainer = event.currentTarget;

    window.onmousemove = event => {
      const shiftX = initX - event.clientX;

      // console.log(viewportContainer.scrollLeft);
      // console.log(shiftX);

      viewportContainer.scrollLeft += shiftX;

      initX = event.clientX;
    };

    window.onmouseup = () => {
      window.onmousemove = null;
      window.onmouseup = null;
    };
  };

  dragStart = event => event.preventDefault();

  render() {
    return (
      <div className="PageCarousel">
        <div className="PageCarousel__controls">
          <div className="PageCarousel__controls-item">
            Фото<sup>{this.props.images.length}</sup>
          </div>
          <div className="PageCarousel__controls-item">
            Кадры<sup>100</sup>
          </div>
        </div>
        <div
          className="PageCarousel__viewport-container"
          onMouseDown={this.test}
          onDragStart={this.dragStart}
        >
          <div className="PageCarousel__viewport">
            {this.props.images
              // .sort((itemA, itemB) => itemA.voteAverage - itemB.voteAverage)
              .map(item => (
                <img
                  key={item.image}
                  src={`https://image.tmdb.org/t/p/w200${item.image}`}
                  alt={item.voteAverage}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

PageCarousel.defaultProps = {
  images: []
};

PageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({}))
};

export default PageCarousel;
