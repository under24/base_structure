import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PersonInfoBlock from './PersonInfoBlock';
import './PersonHeader.scss';

const PersonHeader = props => (
  <header className="PersonHeader">
    <div
      className="PersonHeader__backdrop-image"
      style={{ backgroundImage: `url(${props.backdrop})` }}
    />
    <div className="PersonHeader__person-name">
      <div className="container">{props.name}</div>
    </div>
    <div className="PersonHeader__bottom-strip">
      <div className="container">
        <PersonInfoBlock tmdbId={props.tmdbId} />
      </div>
    </div>
  </header>
);

PersonHeader.propTypes = {
  name: PropTypes.string,
  tmdbId: PropTypes.string,
  backdrop: PropTypes.string
};

PersonHeader.defaultProps = {
  name: '',
  tmdbId: '',
  backdrop: ''
};

const mapStateToProps = (state, ownProps) => {
  const props = {};

  if (state.person[ownProps.tmdbId]) {
    const person = state.person[ownProps.tmdbId];

    if (person.details) {
      props.name = person.details.name;
    }

    if (person.taggedImages) {
      for (let i = 0; i < person.taggedImages.pages['1'].length; i += 1) {
        const currentTaggedImage = person.taggedImages.pages['1'][i];

        if (currentTaggedImage.aspectRatio > 1) {
          props.backdrop = `https://image.tmdb.org/t/p/original${
            currentTaggedImage.image
          }`;
          break;
        }
      }
    }
  }

  return props;
};

export default connect(mapStateToProps)(PersonHeader);
